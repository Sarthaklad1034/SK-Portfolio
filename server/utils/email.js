// server/utils/email.js
// At the top of email.js, add:
if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not defined in environment variables');
}

if (!process.env.ADMIN_EMAIL) {
    console.error('ADMIN_EMAIL is not defined in environment variables');
}

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendNotification = async(messageData) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Your Portfolio <onboarding@resend.dev>', // Update this with your verified domain
            to: process.env.ADMIN_EMAIL,
            subject: 'New Portfolio Contact Message',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">New Message Received</h2>
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
                        <p><strong>From:</strong> ${messageData.name}</p>
                        <p><strong>Email:</strong> ${messageData.email}</p>
                        <p><strong>Time:</strong> ${new Date(messageData.timestamp).toLocaleString()}</p>
                        <div style="margin-top: 20px;">
                            <p><strong>Message:</strong></p>
                            <p style="background: white; padding: 15px; border-radius: 5px;">${messageData.message}</p>
                        </div>
                    </div>
                </div>
            `
        });

        if (error) {
            console.error('Resend error:', error);
            throw new Error('Failed to send email notification');
        }

        return data;
    } catch (error) {
        console.error('Send notification error:', error);
        throw error;
    }
};

const sendResponse = async(to, subject, content) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Your Portfolio <onboarding@resend.dev>', // Update this with your verified domain
            to,
            subject: subject || 'Re: Your Contact Form Submission',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Response to Your Message</h2>
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
                        ${content}
                    </div>
                </div>
            `
        });

        if (error) {
            console.error('Resend error:', error);
            throw new Error('Failed to send response email');
        }

        return data;
    } catch (error) {
        console.error('Send response error:', error);
        throw error;
    }
};

module.exports = { sendNotification, sendResponse };