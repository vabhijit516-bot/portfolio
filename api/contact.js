import express from 'express';
import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const serviceAccountPath = path.join(process.cwd(), 'serviceAccountKey.json');
if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    initializeApp({
        credential: cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
}

const db = getDatabase();

router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body || {};

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required.' });
        }

        const payload = {
            name: String(name).trim(),
            email: String(email).trim(),
            subject: String(subject || 'Portfolio Contact').trim(),
            message: String(message).trim(),
            timestamp: new Date().toISOString(),
        };

        const ref = db.ref('contactMessages').push();
        await ref.set(payload);

        return res.status(200).json({ success: true, id: ref.key, data: payload });
    } catch (error) {
        console.error('Contact save failed:', error);
        return res.status(500).json({ error: error.message || 'Failed to store contact data.' });
    }
});

export default router;
