// ============================================
// FIREBASE + EXPRESS BACKEND
// Node.js server to handle Firebase data and send emails
// ============================================

const express = require('express');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

// ============================================
// INITIALIZATION
// ============================================

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files

// ============================================
// FIREBASE SETUP
// ============================================

// Download serviceAccountKey.json from Firebase Console
// Go to: Project Settings > Service Accounts > Generate New Private Key
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL || "https://your-project-default-rtdb.firebaseio.com"
});

const database = admin.database();

// ============================================
// EMAIL CONFIGURATION (NODEMAILER)
// ============================================

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,      // Your Gmail address
        pass: process.env.EMAIL_PASSWORD    // Gmail App Password
    }
});

// Test email connection on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('Email configuration error:', error);
    } else {
        console.log('✓ Email service ready');
    }
});

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Handle contact form submission
app.post('/api/send-email', async (req, res) => {
    try {
        const { name, email, subject, message, timestamp } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }

        // Save to Firebase
        const messageRef = database.ref('contactMessages').push();
        const firebaseData = {
            name,
            email,
            subject,
            message,
            timestamp: timestamp || new Date().toISOString(),
            read: false
        };

        await messageRef.set(firebaseData);
        const messageId = messageRef.key;

        // Send email to admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `[New Contact] ${subject}`,
            html: generateEmailTemplate(name, email, subject, message, timestamp)
        };

        await transporter.sendMail(adminMailOptions);

        // Optionally send confirmation email to user
        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'We received your message',
            html: generateConfirmationEmail(name)
        };

        await transporter.sendMail(userMailOptions);

        res.json({
            success: true,
            message: 'Email sent successfully',
            messageId: messageId
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get all messages (admin only - add authentication in production)
app.get('/api/messages', async (req, res) => {
    try {
        const snapshot = await database.ref('contactMessages').orderByChild('timestamp').limitToLast(50).once('value');
        const messages = [];

        snapshot.forEach(childSnapshot => {
            messages.unshift({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        res.json({
            success: true,
            count: messages.length,
            messages: messages
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Mark message as read
app.post('/api/messages/:id/read', async (req, res) => {
    try {
        const { id } = req.params;
        await database.ref(`contactMessages/${id}/read`).set(true);

        res.json({
            success: true,
            message: 'Message marked as read'
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Delete message
app.delete('/api/messages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await database.ref(`contactMessages/${id}`).remove();

        res.json({
            success: true,
            message: 'Message deleted'
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ============================================
// EMAIL TEMPLATES
// ============================================

function generateEmailTemplate(name, email, subject, message, timestamp) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
                .content { padding: 20px; }
                .field { margin: 15px 0; }
                .label { color: #667eea; font-weight: bold; }
                .value { color: #333; margin-top: 5px; padding: 10px; background: #f9f9f9; border-left: 3px solid #667eea; }
                .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>📧 New Contact Form Submission</h2>
                </div>
                <div class="content">
                    <div class="field">
                        <span class="label">From:</span>
                        <div class="value">${name} &lt;${email}&gt;</div>
                    </div>
                    <div class="field">
                        <span class="label">Subject:</span>
                        <div class="value">${subject}</div>
                    </div>
                    <div class="field">
                        <span class="label">Message:</span>
                        <div class="value">${message.replace(/\n/g, '<br>')}</div>
                    </div>
                    <div class="field">
                        <span class="label">Received at:</span>
                        <div class="value">${new Date(timestamp).toLocaleString()}</div>
                    </div>
                </div>
                <div class="footer">
                    <p>This is an automated message from your contact form. Please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

function generateConfirmationEmail(name) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
                .content { padding: 20px; color: #333; }
                .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>✓ Thank You!</h2>
                </div>
                <div class="content">
                    <p>Hi ${name},</p>
                    <p>We received your message and will get back to you as soon as possible.</p>
                    <p>We appreciate you reaching out to us!</p>
                    <p>Best regards,<br>The Team</p>
                </div>
                <div class="footer">
                    <p>© 2024 All rights reserved</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// ============================================
// SERVER START
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
    ============================================
    🚀 Server running on http://localhost:${PORT}
    ============================================
    
    ✓ Firebase Database Connected
    ✓ Email Service Ready
    
    Available endpoints:
    - GET  /api/health
    - POST /api/send-email
    - GET  /api/messages
    - POST /api/messages/:id/read
    - DELETE /api/messages/:id
    ============================================
    `);
});

module.exports = app;

