import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import * as admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { cert, initializeApp } from "firebase-admin/app";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Load firebase-applet-config.json safely for absolute runtime durability
const configPath = path.join(process.cwd(), "firebase-applet-configuration.json");
const firebaseConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));

// Load Firebase Admin SDK service account key
const serviceAccountPath = path.join(process.cwd(), "serviceAccountKey.json");
const serviceAccount: ServiceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Initialize Firebase Admin SDK with service account credentials
initializeApp({
    credential: cert(serviceAccount),
});

// Use the admin Firestore instance
const db = getFirestore();

// Initialize Gemini SDK safely (Lazy client getter)
function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is required");
    }
    return new GoogleGenerativeAI(apiKey);
}

// API Routes

// Endpoint 1: Contact Form and Admin Email Compilation
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, description, userAgent, userIp } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required fields" });
        }

        let emailDraft = "No AI draft completed.";

        // Call Gemini API to formulate/draft the email template for vabhijit516@gmail.com
        try {
            const ai = getGeminiClient();
            const prompt = `
        You are an advanced AI transmission and routing system. 
        You need to draft a professional, context-aware notification email to the admin: Abhijit (vabhijit516@gmail.com).
        
        Details of transmission:
        - Sender Name: ${name}
        - Sender Email: ${email}
        - Message/Description: "${description || 'No description provided'}"
        
        Write a highly professional, formatted email draft with a Subject line and clean Message Body. Mention that this message was processed and relayed using the Gemini AI interface dynamically.
      `;

            const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
            const response = await model.generateContent(prompt);

            if (response && response.response && response.response.text()) {
                emailDraft = response.response.text();
            }
        } catch (aiError: any) {
            console.error("Gemini API computation failed:", aiError.message);
            emailDraft = `Fallback system draft: Name: ${name}, Email: ${email}, Message: ${description}. (Gemini API processing was unavailable: ${aiError.message})`;
        }

        // Save transmission data dynamically into Firestore database
        const transmissionRef = await db.collection("transmissions").add({
            name,
            email,
            description: description || "",
            adminEmailDraft: emailDraft,
            targetAdminMail: "vabhijit516@gmail.com",
            createdAt: FieldValue.serverTimestamp(),
        });

        // Also store an explicit log entry (stores user logging/action trace)
        await db.collection("logs").add({
            action: "CONTACT_FORM_SUBMISSION",
            timestamp: FieldValue.serverTimestamp(),
            ip: userIp || "unknown",
            userAgent: userAgent || "unknown",
            details: `Submitted contact from ${name} (${email}). Transmission document ID: ${transmissionRef.id}. Simulated send to vabhijit516@gmail.com triggered.`,
        });

        res.json({
            success: true,
            message: "secure transmission logs stored dynamically in the Firestore database.",
            id: transmissionRef.id,
            emailDraft,
            recipient: "vabhijit516@gmail.com",
        });

    } catch (error: any) {
        console.error("Transmission transaction failed:", error);
        res.status(500).json({ error: "System failed during initiate transmission workflow", details: error.message });
    }
});

// Endpoint 2: Log User Actions (such as resume downloads or session initialization)
app.post("/api/logs", async (req, res) => {
    try {
        const { action, details, userAgent, userIp } = req.body;

        if (!action) {
            return res.status(400).json({ error: "Action string is required to save logs" });
        }

        const logRef = await db.collection("logs").add({
            action,
            timestamp: FieldValue.serverTimestamp(),
            ip: userIp || "unknown",
            userAgent: userAgent || "unknown",
            details: details || "",
        });

        res.json({
            success: true,
            logId: logRef.id,
            message: "Log entry stored dynamically in the Firestore database.",
        });

    } catch (error: any) {
        console.error("Logging transaction failed:", error);
        res.status(500).json({ error: "System failed during direct logging operations", details: error.message });
    }
});

// Serve frontend assets
async function startServer() {
    if (process.env.NODE_ENV !== "production") {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: "spa",
        });
        app.use(vite.middlewares);
    } else {
        const distPath = path.join(process.cwd(), "dist");
        app.use(express.static(distPath));
        app.get("*", (req, res) => {
            res.sendFile(path.join(distPath, "index.html"));
        });
    }

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
