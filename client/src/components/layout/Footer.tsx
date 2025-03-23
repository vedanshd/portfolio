import { ChevronUp, Mail, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-8 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Vedansh Dhawan. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a 
              href="mailto:vedanshd04@gmail.com" 
              className="text-muted-foreground hover:text-accent transition-colors duration-300"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/vedansh-dhawan-50a860323/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-accent transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-accent transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
          <button 
            onClick={scrollToTop}
            className="bg-muted p-2 rounded-full hover:bg-muted/70 transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-5 w-5 text-accent" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
