import {
database, ref, push,
set
} from '@/lib/firebase';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport
    ({
        service:
            'gmail',
        auth:
        {
            user:
                process.env.EMAIL_USER,
            pass:
                process.env.EMAIL_PASSWORD,
        },
    });

export async function POST
    (request) {
    try {
        const { name, email, subject, message } = await request.json
            ();

        if (!name || !email || !subject || !message) {
            return Response.json(
                {
                    error:
                        'Missing required fields'
                },
                {
                    status:
                        400
                }
            );
        }

        const contactData = {
            name,
            email,
            subject,
            message,
            timestamp:
                new Date
                    ().toISOString
                    (),
        };

        const contactsRef = ref
            (database, 'contactMessages');
        const newRef = await push
            (contactsRef);
        await
            set
                (newRef, contactData);

        try {
            await transporter.sendMail
                ({
                    from:
                        process.env.EMAIL_USER,
                    to:
                        process.env.ADMIN_EMAIL,
                    subject:
                        `New
Contact:
${subject}`,
                    html:
                        `<h2>New Message</h2><p><strong>
From:
</strong> ${name}
(${email})</p><p>${message.replace
                            (/\n/g, '<br>')}</p>`,
                });
        } catch
        (emailError) {
            console.error
                ('Email failed:', emailError);
        }

        return Response.json(
            {
                success:
                    true,
                message:
                    'Message received',
                id:
                    newRef.key
            },
            {
                status:
                    200
            }
        );
    } catch
    (error) {
        console.error
            ('Error:', error);
        return Response.json(
            {
                error:
                    error.message
            },
            {
                status:
                    500
            }
        );
    }
}

export async function GET
    () {
    return Response.json({
        status:
            'API working'
    });
}