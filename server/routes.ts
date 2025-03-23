import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to handle contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate input
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      // In a real application, this would save to a database or send an email
      // For now, just return a success response
      res.status(200).json({ message: 'Message received successfully' });
    } catch (error) {
      console.error('Error handling contact form:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // API endpoint to download resume
  app.get('/api/resume', (req, res) => {
    const resumePath = path.join(__dirname, '../attached_assets/vedansh_resume.pdf');
    
    // Check if file exists
    if (fs.existsSync(resumePath)) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=vedansh_resume.pdf');
      
      // Stream the file
      const fileStream = fs.createReadStream(resumePath);
      fileStream.pipe(res);
    } else {
      res.status(404).json({ message: 'Resume not found' });
    }
  });

  const httpServer = createServer(app);
  
  return httpServer;
}
