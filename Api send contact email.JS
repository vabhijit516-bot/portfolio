// pages/api/send-contact-email.js or app/api/send-contact-email/route.js
// Next.js API route to handle email sending

// ============================================
// FOR PAGES ROUTER (pages/api/)
// ============================================

import nodemailer from 'nodemailer';

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Gmail App Password
    },
});

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, subject, message, timestamp, firebaseId } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // ============================================
        // EMAIL 1: TO ADMIN
        // ============================================
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `[Portfolio Contact] ${subject}`,
            html: adminEmailTemplate(name, email, subject, message, timestamp, firebaseId),
        };

        // ============================================
        // EMAIL 2: TO USER (CONFIRMATION)
        // ============================================
        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'We received your message',
            html: userConfirmationTemplate(name),
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions),
        ]);

        return res.status(200).json({
            success: true,
            message: 'Emails sent successfully',
        });

    } catch (error) {
        console.error('Email error:', error);
        return res.status(500).json({
            error: 'Failed to send email',
            details: error.message,
        });
    }
}

// ============================================
// EMAIL TEMPLATES
// ============================================

function adminEmailTemplate(name, email, subject, message, timestamp, firebaseId) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h2 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 30px;
        }
        .field {
          margin: 20px 0;
        }
        .label {
          color: #667eea;
          font-weight: bold;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .value {
          color: #333;
          margin-top: 8px;
          padding: 12px;
          background: #f9f9f9;
          border-left: 3px solid #667eea;
          word-break: break-word;
        }
        .message-content {
          background: #f9f9f9;
          border-left: 3px solid #667eea;
          padding: 12px;
          color: #333;
          line-height: 1.6;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .footer {
          background: #f5f5f5;
          padding: 20px;
          text-align: center;
          color: #999;
          font-size: 12px;
          border-top: 1px solid #e0e0e0;
        }
        .button {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>📧 New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">From</div>
            <div class="value">${name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email</div>
            <div class="value">
              <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
            </div>
          </div>
          
          <div class="field">
            <div class="label">Subject</div>
            <div class="value">${subject}</div>
          </div>
          
          <div class="field">
            <div class="label">Message</div>
            <div class="message-content">${message}</div>
          </div>
          
          <div class="field">
            <div class="label">Received</div>
            <div class="value">${new Date(timestamp).toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
    })}</div>
          </div>
 
          ${firebaseId ? `
            <div class="field">
              <div class="label">Firebase ID</div>
              <div class="value" style="font-family: monospace; font-size: 11px;">${firebaseId}</div>
            </div>
          ` : ''}
        </div>
        <div class="footer">
          <p>This is an automated notification from your portfolio contact form.</p>
          <p>Reply directly to this email to respond to ${name}.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function userConfirmationTemplate(name) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h2 {
          margin: 0;
          font-size: 28px;
        }
        .content {
          padding: 30px;
          color: #333;
          line-height: 1.6;
        }
        .footer {
          background: #f5f5f5;
          padding: 20px;
          text-align: center;
          color: #999;
          font-size: 12px;
          border-top: 1px solid #e0e0e0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>✓ Thank You!</h2>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          
          <p>Thank you for reaching out! We've received your message and will get back to you as soon as possible.</p>
          
          <p>We appreciate you taking the time to contact us, and we look forward to connecting with you soon.</p>
          
          <p>Best regards,<br>The Team</p>
        </div>
        <div class="footer">
          <p>© 2024 All rights reserved. This is an automated message, please don't reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}