import { useEffect, useRef } from 'react';
import SectionTitle from '@/components/ui/section-title';
import { useAnimation, useInView, motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import AnimatedCard from '@/components/ui/animated-card';

type ExperienceItemProps = {
  title: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: Array<{
    title: string;
    description: string;
  }>;
};

const ExperienceItem = ({ title, company, location, duration, responsibilities }: ExperienceItemProps) => (
  <AnimatedCard>
    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-lg text-accent">{company}</p>
        <p className="text-muted-foreground">{location}</p>
      </div>
      <div className="mt-2 md:mt-0 md:text-right">
        <p className="text-accent font-mono">{duration}</p>
      </div>
    </div>
    
    <div className="mt-4">
      <ul className="space-y-4 text-muted-foreground">
        {responsibilities.map((resp, index) => (
          <li key={index} className="flex items-start">
            <span className="text-accent mr-2 mt-1">▹</span>
            <span>
              <strong className="text-foreground">{resp.title}</strong> – {resp.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </AnimatedCard>
);

const Experience = () => {
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

  const experienceData = {
    title: "Software Intern",
    company: "Ericsson",
    location: "Noida, Uttar Pradesh",
    duration: "May 2024 – July 2024",
    responsibilities: [
      {
        title: "Telecommunication Fundamentals",
        description: "Strong knowledge of network operations & mobile communication protocols."
      },
      {
        title: "Linux Proficiency",
        description: "Experience with command-line operations, scripting, and system administration."
      },
      {
        title: "Python Programming",
        description: "Built automation scripts, data analysis pipelines, and efficiency-improving tools."
      },
      {
        title: "Software Testing & Troubleshooting",
        description: "Developed test cases to enhance software reliability & optimize network performance."
      },
      {
        title: "Cross-Functional Collaboration",
        description: "Worked with diverse teams to improve network efficiency and service quality."
      }
    ]
  };

  return (
    <section id="experience" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle number="03" title="Experience" />
        
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={controls}
          variants={fadeIn}
        >
          <ExperienceItem {...experienceData} />
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
