import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import type { ServiceAccount } from "firebase-admin";
import { cert, initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
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
    databaseURL: process.env.FIREBASE_DATABASE_URL || firebaseConfig.databaseURL || firebaseConfig.databaseUrl,
});

// Use the admin Realtime Database instance
const db = getDatabase();

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
        const { name, email, subject, message, description, userAgent, userIp } = req.body;

        const senderName = String(name || "").trim();
        const senderEmail = String(email || "").trim();
        const senderSubject = String(subject || "Portfolio Contact").trim();
        const senderMessage = String(message || description || "").trim();

        if (!senderName || !senderEmail || !senderMessage) {
            return res.status(400).json({ error: "Name, email, and message are required fields" });
        }

        const payload = {
            name: senderName,
            email: senderEmail,
            subject: senderSubject,
            message: senderMessage,
            timestamp: new Date().toISOString(),
            ip: userIp || "unknown",
            userAgent: userAgent || "unknown",
        };

        const contactsRef = db.ref("contactMessages");
        const newRef = contactsRef.push();
        await newRef.set(payload);

        res.json({
            success: true,
            message: "Contact details were stored successfully.",
            id: newRef.key,
            recipient: "vabi3388@gmail.com",
        });

    } catch (error: any) {
        console.error("Transmission transaction failed:", error);
        res.status(500).json({ error: "System failed during initiate transmission workflow", details: error.message });
    }
});

// Health probe for the contact API
app.get("/api/contact", (_req, res) => {
    res.status(200).json({ status: "ok" });
});

// Endpoint 2: Log User Actions (such as resume downloads or session initialization)
app.post("/api/logs", async (req, res) => {
    try {
        const { action, details, userAgent, userIp } = req.body;

        if (!action) {
            return res.status(400).json({ error: "Action string is required to save logs" });
        }

        const logsRef = db.ref("logs");
        const newLogRef = logsRef.push();
        await newLogRef.set({
            action,
            timestamp: new Date().toISOString(),
            ip: userIp || "unknown",
            userAgent: userAgent || "unknown",
            details: details || "",
        });

        res.json({
            success: true,
            logId: newLogRef.key,
            message: "Log entry stored dynamically in the Realtime Database.",
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
