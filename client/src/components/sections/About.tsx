import { useRef } from 'react';
import SectionTitle from '@/components/ui/section-title';
import { Linkedin, Github } from 'lucide-react';
import { useAnimation, useInView, motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import GradientBorder from '@/components/ui/gradient-border';

const About = () => {
  const controls = useAnimation();
  const contentRef = useRef(null);
  const techStackRef = useRef(null);
  
  const contentInView = useInView(contentRef, {
    once: true,
    margin: '-100px 0px',
  });
  
  const techStackInView = useInView(techStackRef, {
    once: true,
    margin: '-100px 0px',
  });

  // Start animations when elements come into view
  if (contentInView) {
    controls.start('visible');
  }
  
  if (techStackInView) {
    controls.start('visible');
  }

  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle number="01" title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={contentRef}
            initial="hidden"
            animate={contentInView ? 'visible' : 'hidden'}
            variants={fadeIn}
          >
            <p className="text-muted-foreground mb-6">
              I'm a Computer Science student at VIT Vellore with experience as a Software Intern at Ericsson. My academic journey has equipped me with strong foundations in Python, Java, JavaScript, C++, AI/ML, Web Development, and Networking.
            </p>
            <p className="text-muted-foreground mb-6">
              My passion lies in leveraging technology to solve complex real-world problems. Whether it's developing AI-powered applications, creating efficient full-stack solutions, or automating processes, I'm driven by the challenge of building innovative solutions.
            </p>
            <p className="text-muted-foreground mb-6">
              With a curious mind and strong analytical skills, I continuously explore emerging technologies to enhance my abilities as a developer. My goal is to create impactful solutions that make a difference in people's lives.
            </p>
            <div className="flex space-x-4 mt-8">
              <a 
                href="https://www.linkedin.com/in/vedansh-dhawan-50a860323/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-accent hover:text-foreground transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-accent hover:text-foreground transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </motion.div>

          <motion.div
            ref={techStackRef}
            initial="hidden"
            animate={techStackInView ? 'visible' : 'hidden'}
            variants={fadeIn}
          >
            <GradientBorder>
              <div className="p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-accent">Tech Stack</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-mono text-sm text-muted-foreground mb-2">Languages</h4>
                    <ul className="space-y-2">
                      {['Python', 'Java', 'JavaScript', 'C++'].map((lang) => (
                        <li key={lang} className="flex items-center">
                          <span className="text-accent mr-2">▹</span> {lang}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-mono text-sm text-muted-foreground mb-2">Technologies</h4>
                    <ul className="space-y-2">
                      {['React.js', 'FastAPI', 'AWS', 'Azure AI'].map((tech) => (
                        <li key={tech} className="flex items-center">
                          <span className="text-accent mr-2">▹</span> {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </GradientBorder>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
