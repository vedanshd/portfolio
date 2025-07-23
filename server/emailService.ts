import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export interface ContactEmail {
  name: string;
  email: string;
  message: string;
}

export class EmailService {
  private transporter: Transporter | null = null;

  private createTransporter(): Transporter {
    if (!this.transporter) {
      console.log('🔧 Creating email transporter with credentials...');
      console.log('📧 Email user configured:', process.env.EMAIL_USER ? 'Yes' : 'No');
      console.log('🔑 Email password configured:', process.env.EMAIL_PASS ? 'Yes' : 'No');
      
      this.transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Your Gmail address
          pass: process.env.EMAIL_PASS, // Your Gmail app password
        },
      });
    }
    return this.transporter;
  }

  async sendContactEmail(contactData: ContactEmail): Promise<boolean> {
    try {
      const transporter = this.createTransporter();
      // Email to be sent to you (Vedansh)
      const mailOptions = {
        from: `"${contactData.name}" <${process.env.EMAIL_USER}>`, // Your Gmail as sender
        to: process.env.EMAIL_USER, // Your email to receive the message
        replyTo: contactData.email, // Visitor's email for easy reply
        subject: `Portfolio Contact: Message from ${contactData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057; margin-top: 0;">Contact Details:</h3>
              <p><strong>Name:</strong> ${contactData.name}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
              <h3 style="color: #495057; margin-top: 0;">Message:</h3>
              <p style="line-height: 1.6; color: #212529;">${contactData.message}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e7f3ff; border-radius: 8px;">
              <p style="margin: 0; color: #0c5aa6; font-size: 14px;">
                📧 <strong>Quick Reply:</strong> Just hit reply to respond directly to ${contactData.name} at ${contactData.email}
              </p>
            </div>
            
            <div style="margin-top: 20px; text-align: center; color: #6c757d; font-size: 12px;">
              <p>This message was sent from your portfolio contact form.</p>
              <p>Time: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
        text: `
New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}

Message:
${contactData.message}

---
Sent from portfolio contact form on ${new Date().toLocaleString()}
        `
      };

      // Send confirmation email to the visitor
      const confirmationOptions = {
        from: `"Vedansh Dhawan" <${process.env.EMAIL_USER}>`,
        to: contactData.email,
        subject: 'Thanks for reaching out! - Vedansh Dhawan',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              Thank you for your message!
            </h2>
            
            <p>Hi ${contactData.name},</p>
            
            <p>Thank you for reaching out through my portfolio website! I've received your message and will get back to you as soon as possible.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #495057; margin-top: 0;">Your message:</h3>
              <p style="font-style: italic; color: #6c757d;">"${contactData.message}"</p>
            </div>
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Connect with me on <a href="https://linkedin.com/in/vedansh-dhawan-50a860323" style="color: #007bff;">LinkedIn</a></li>
              <li>Check out my projects on my portfolio</li>
              <li>Email me directly at vedanshd04@gmail.com</li>
            </ul>
            
            <p>Looking forward to connecting with you!</p>
            
            <p>Best regards,<br>
            <strong>Vedansh Dhawan</strong><br>
            Computer Science Student | Software Developer</p>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e7f3ff; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #0c5aa6; font-size: 14px;">
                📧 vedanshd04@gmail.com | 📱 +91 9599036305
              </p>
            </div>
          </div>
        `,
        text: `
Hi ${contactData.name},

Thank you for reaching out through my portfolio website! I've received your message and will get back to you as soon as possible.

Your message: "${contactData.message}"

In the meantime, feel free to:
- Connect with me on LinkedIn: https://linkedin.com/in/vedansh-dhawan-50a860323
- Email me directly at vedanshd04@gmail.com

Looking forward to connecting with you!

Best regards,
Vedansh Dhawan
Computer Science Student | Software Developer
📧 vedanshd04@gmail.com | 📱 +91 9599036305
        `
      };

      // Send both emails
      await transporter.sendMail(mailOptions);
      await transporter.sendMail(confirmationOptions);

      console.log('✅ Contact emails sent successfully to:', process.env.EMAIL_USER);
      return true;
    } catch (error) {
      console.error('❌ Failed to send contact email:', error);
      return false;
    }
  }

  // Test email configuration
  async testConnection(): Promise<boolean> {
    try {
      const transporter = this.createTransporter();
      await transporter.verify();
      console.log('✅ Email service is ready');
      return true;
    } catch (error) {
      console.error('❌ Email service configuration error:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
