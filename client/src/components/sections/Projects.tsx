import { useEffect, useRef } from 'react';
import SectionTitle from '@/components/ui/section-title';
import { useAnimation, useInView, motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import AnimatedCard from '@/components/ui/animated-card';
import { ExternalLink, Github } from 'lucide-react';

type ProjectProps = {
  title: string;
  subtitle: string;
  date: string;
  achievement?: string;
  technologies: string[];
  points: Array<{
    title: string;
    description: string;
  }>;
};

const ProjectItem = ({ title, subtitle, date, achievement, technologies, points }: ProjectProps) => (
  <AnimatedCard>
    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
      <div>
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-bold mr-3">{title}</h3>
          {achievement && (
            <span className="bg-accent bg-opacity-20 text-accent px-2 py-1 rounded text-xs font-medium">
              {achievement}
            </span>
          )}
        </div>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      <div className="mt-2 md:mt-0 md:text-right">
        <p className="text-accent font-mono">{date}</p>
      </div>
    </div>
    
    <div className="mb-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span key={index} className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
            {tech}
          </span>
        ))}
      </div>
    </div>
    
    <div className="mt-4">
      <ul className="space-y-4 text-muted-foreground">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className="text-accent mr-2 mt-1">▹</span>
            <span>
              <strong className="text-foreground">{point.title}</strong> – {point.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
    
    <div className="mt-6 flex flex-wrap gap-4">
      <a href="#" className="flex items-center text-accent hover:text-foreground transition-colors duration-300">
        <span className="mr-2">View Demo</span>
        <ExternalLink className="h-5 w-5" />
      </a>
      <a href="#" className="flex items-center text-accent hover:text-foreground transition-colors duration-300">
        <span className="mr-2">Source Code</span>
        <Github className="h-5 w-5" />
      </a>
    </div>
  </AnimatedCard>
);

const Projects = () => {
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

  const projectData = {
    title: "Gen AI Medical Chatbot",
    subtitle: "GenHack Hackathon",
    date: "February 2024",
    achievement: "", // Removed the achievement box
    technologies: ["Hugging Face", "OpenAI", "FastAPI", "React", "AWS Lambda"],
    points: [
      {
        title: "Development",
        description: "Developed an AI-powered medical chatbot using Hugging Face's NLP models to assist patients with basic diagnoses."
      },
      {
        title: "NLP Implementation",
        description: "Implemented sentiment analysis & intent recognition for accurate medical responses."
      },
      {
        title: "Full-Stack Integration",
        description: "Integrated FastAPI backend with a React-based frontend, hosted on AWS Lambda for scalability."
      },
      {
        title: "Achievement",
        description: "Secured 4th place out of 100+ teams in GenHack, an ISA-VIT organized Gen AI Hackathon."
      }
    ]
  };

  return (
    <section id="projects" className="py-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle number="04" title="Projects" />
        
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={controls}
          variants={fadeIn}
        >
          <ProjectItem {...projectData} />
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
