import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/lib/animations';

const Hero = () => {
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      // Type writer effect for the code block
      const codeElement = codeRef.current;
      const originalText = codeElement.textContent || '';
      codeElement.textContent = '';
      
      let i = 0;
      const typeWriterEffect = setInterval(() => {
        if (i < originalText.length) {
          codeElement.textContent += originalText.charAt(i);
          i++;
        } else {
          clearInterval(typeWriterEffect);
        }
      }, 20);
      
      return () => clearInterval(typeWriterEffect);
    }
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 bg-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="space-y-5"
          >
            <motion.p variants={slideUp} className="text-accent font-mono mb-5">Hi, my name is</motion.p>
            <motion.h1 variants={slideUp} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
              Vedansh Dhawan
            </motion.h1>
            <motion.h2 variants={slideUp} className="text-2xl sm:text-3xl md:text-4xl font-semibold text-muted-foreground mb-6">
              Computer Science Engineer | AI & Full-Stack Developer
            </motion.h2>
            <motion.p variants={slideUp} className="text-muted-foreground max-w-lg mb-8 text-lg">
              Passionate about solving real-world problems through AI, full-stack development, and automation.
              Currently studying at VIT Vellore with experience as a Software Intern at Ericsson.
            </motion.p>
            <motion.div variants={slideUp} className="flex space-x-4">
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-transparent border border-accent text-accent rounded-md hover:bg-accent hover:bg-opacity-10 transition-all duration-300"
              >
                Get in Touch
              </a>
              <a 
                href="/vedansh_resume.pdf" 
                download="Vedansh_Dhawan_Resume.pdf"
                target="_blank"
                className="px-6 py-3 bg-accent text-primary font-medium rounded-md hover:bg-opacity-90 transition-all duration-300"
              >
                Download Resume
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent opacity-10 rounded-lg transform rotate-3"></div>
              <div className="relative bg-primary border border-accent/20 p-8 rounded-lg transform -rotate-3 transition-transform duration-500 hover:rotate-0">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <pre ref={codeRef} className="font-mono text-sm text-muted-foreground overflow-x-auto">
{`function introduceMyself() {
  const developer = {
    name: 'Vedansh Dhawan',
    role: 'Full-Stack Developer',
    specialization: 'AI & ML',
    loves: ['coding', 'problem-solving']
  };
  
  return developer;
}`}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
