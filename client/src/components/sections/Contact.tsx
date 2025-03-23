import { useState, useRef, useEffect } from 'react';
import SectionTitle from '@/components/ui/section-title';
import { useAnimation, useInView, motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import GradientBorder from '@/components/ui/gradient-border';
import { Linkedin, FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px 0px',
  });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, we would send data to a server endpoint
      // For now, we'll simulate a response after 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast({
        title: "Message sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadResume = () => {
    // Create a link to download the resume
    const link = document.createElement('a');
    link.href = '/vedansh_resume.pdf'; 
    link.download = 'Vedansh_Dhawan_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Your resume is being downloaded.",
    });
  };

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle number="07" title="Contact Me" />
        
        <div className="text-center mb-12">
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a question or want to work together? Feel free to reach out to me using the form below or connect with me on LinkedIn.
          </p>
        </div>
        
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={controls}
          variants={fadeIn}
          className="max-w-2xl mx-auto"
        >
          <GradientBorder>
            <div className="p-6 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                      Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-muted border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-muted border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-muted border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-muted border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-accent text-primary font-medium rounded-md hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.linkedin.com/in/vedansh-dhawan-50a860323/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent hover:text-foreground transition-colors duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <button
                      onClick={handleDownloadResume}
                      className="text-accent hover:text-foreground transition-colors duration-300"
                      aria-label="Download Resume"
                    >
                      <FileDown className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </GradientBorder>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
