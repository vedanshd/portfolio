import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function testEmail() {
    console.log('Testing email configuration...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***hidden***' : 'NOT SET');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Verify connection
    try {
        console.log('Verifying SMTP connection...');
        await transporter.verify();
        console.log('✓ SMTP connection verified successfully');
    } catch (error) {
        console.error('✗ SMTP connection failed:', error.message);
        return;
    }

    // Test sending email
    const testMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to yourself for testing
        subject: 'Test Email from Portfolio Contact Form',
        html: `
            <h2>Test Contact Message</h2>
            <p><strong>Name:</strong> Test User</p>
            <p><strong>Email:</strong> test@example.com</p>
            <p><strong>Message:</strong> This is a test message to verify email functionality.</p>
            <p><em>Sent at: ${new Date().toLocaleString()}</em></p>
        `
    };

    try {
        console.log('Sending test email...');
        const info = await transporter.sendMail(testMailOptions);
        console.log('✓ Test email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Check your inbox at:', process.env.EMAIL_USER);
    } catch (error) {
        console.error('✗ Failed to send test email:', error.message);
        if (error.code) {
            console.error('Error code:', error.code);
        }
        if (error.response) {
            console.error('Server response:', error.response);
        }
    }
}

testEmail();
