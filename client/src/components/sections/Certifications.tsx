import { useEffect, useRef } from 'react';
import SectionTitle from '@/components/ui/section-title';
import { useAnimation, useInView, motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import GradientBorder from '@/components/ui/gradient-border';

type CertificationItemProps = {
  title: string;
  issuer: string;
  date: string;
};

type AwardItemProps = {
  title: string;
  description: string;
};

const CertificationsSection = () => {
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

  const certifications: CertificationItemProps[] = [
    {
      title: "Career Essentials in Generative AI",
      issuer: "Microsoft & LinkedIn",
      date: "Feb 2025"
    },
    {
      title: "Microsoft Azure AI Essentials Professional Certificate",
      issuer: "Microsoft & LinkedIn",
      date: "Feb 2025"
    }
  ];

  const awards: AwardItemProps[] = [
    {
      title: "Gold Medal",
      description: "Recognized for academic excellence at Delhi Public School Gurgaon (2022)"
    },
    {
      title: "National Topper in Mathematics & IT",
      description: "Full marks in 10th Board Exams (2022)"
    },
    {
      title: "Photography & Editing Competition",
      description: "2nd Prize (Blue Bells Public School, Gurgaon, 2019)"
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle number="06" title="Certifications & Awards" />
        
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={controls}
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Certifications */}
          <motion.div variants={fadeIn} className="card-hover">
            <GradientBorder>
              <div className="p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-accent">Certifications</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent mr-2 mt-1">▹</span>
                      <div>
                        <p className="text-foreground font-medium">{cert.title}</p>
                        <p>{cert.issuer} ({cert.date})</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </GradientBorder>
          </motion.div>

          {/* Awards */}
          <motion.div variants={fadeIn} className="card-hover">
            <GradientBorder>
              <div className="p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-accent">Honors & Awards</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {awards.map((award, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent mr-2 mt-1">▹</span>
                      <div>
                        <p className="text-foreground font-medium">{award.title}</p>
                        <p>{award.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </GradientBorder>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
