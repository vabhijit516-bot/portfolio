import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = 3000;
const CONTACT_STORE_FILE = path.join(process.cwd(), "contact-messages.json");
const LOG_STORE_FILE = path.join(process.cwd(), "activity-log.json");

app.use(express.json());

let localContactMessages: Array<Record<string, any>> = [];
let localLogs: Array<Record<string, any>> = [];

if (fs.existsSync(CONTACT_STORE_FILE)) {
    try {
        localContactMessages = JSON.parse(fs.readFileSync(CONTACT_STORE_FILE, "utf8"));
    } catch (error) {
        console.warn("Unable to read local contact store; starting fresh.", error);
    }
}

if (fs.existsSync(LOG_STORE_FILE)) {
    try {
        localLogs = JSON.parse(fs.readFileSync(LOG_STORE_FILE, "utf8"));
    } catch (error) {
        console.warn("Unable to read local log store; starting fresh.", error);
    }
}

async function persistContact(payload: Record<string, any>) {
    const entry = {
        ...payload,
        timestamp: payload.timestamp || new Date().toISOString(),
        storedAt: new Date().toISOString(),
    };
    localContactMessages.push(entry);
    fs.writeFileSync(CONTACT_STORE_FILE, JSON.stringify(localContactMessages, null, 2));
    return { id: `local-${localContactMessages.length}`, storage: "local-file" };
}

async function persistLog(payload: Record<string, any>) {
    const entry = {
        ...payload,
        timestamp: payload.timestamp || new Date().toISOString(),
    };
    localLogs.push(entry);
    fs.writeFileSync(LOG_STORE_FILE, JSON.stringify(localLogs, null, 2));
    return { id: `log-${localLogs.length}`, storage: "local-file" };
}

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

        const saveResult = await persistContact(payload);

        res.json({
            success: true,
            message: "Contact details were stored successfully.",
            id: saveResult.id,
            recipient: "vabi3388@gmail.com",
            storage: saveResult.storage,
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

        const saveResult = await persistLog({
            action,
            timestamp: new Date().toISOString(),
            ip: userIp || "unknown",
            userAgent: userAgent || "unknown",
            details: details || "",
        });

        res.json({
            success: true,
            logId: saveResult.id,
            message: "Log entry stored locally for this session.",
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
