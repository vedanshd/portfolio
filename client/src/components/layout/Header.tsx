import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, navigate] = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-secondary/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a 
            href="#home" 
            className="text-accent font-mono text-xl font-semibold"
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          >
            &lt;VD /&gt;
          </a>

          <div className="hidden md:block">
            <nav className="flex space-x-8">
              {['home', 'about', 'education', 'experience', 'projects', 'skills', 'contact'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item}`}
                  className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm font-medium"
                  onClick={(e) => { e.preventDefault(); handleNavClick(item); }}
                >
                  <span className="text-accent font-mono mr-1">{`0${index + 1}.`}</span>
                  <span className="capitalize">{item}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center">
            <div className="md:hidden">
              <button 
                className="text-foreground focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full transition-all duration-300 bg-primary bg-opacity-90 backdrop-blur-md ${mobileMenuOpen ? 'max-h-96 border-b border-accent/20' : 'max-h-0 overflow-hidden'}`}>
        <nav className="flex flex-col space-y-4 p-6">
          {['home', 'about', 'education', 'experience', 'projects', 'skills', 'contact'].map((item, index) => (
            <a 
              key={item}
              href={`#${item}`}
              className="text-muted-foreground hover:text-accent transition-colors duration-300"
              onClick={(e) => { e.preventDefault(); handleNavClick(item); }}
            >
              <span className="text-accent font-mono mr-2">{`0${index + 1}.`}</span>
              <span className="capitalize">{item}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
