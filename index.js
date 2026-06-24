import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nodemailer from "nodemailer";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// Setup Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Setup Database
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// API Route
app.post("/send-message", async (req, res) => {
  const { senderEmail, adminEmail, message } = req.body;

  // Process message with Gemini
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(`Summarize: ${message}`);
  const summary = result.response.text();

  // Store in DB
  await pool.query(
    "INSERT INTO messages (sender_email, admin_email, message_text) VALUES ($1, $2, $3)",
    [senderEmail, adminEmail, summary]
  );

  // Send email to admin
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({
    from: senderEmail,
    to: adminEmail,
    subject: "New Message via Gemini",
    text: summary
  });

  res.json({ status: "Message sent and stored" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
