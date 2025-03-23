import { ReactNode, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import GradientBorder from "./gradient-border";

interface AnimatedCardProps {
  children: ReactNode;
}

const AnimatedCard = ({ children }: AnimatedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="animate-on-scroll card-hover"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <GradientBorder>
        <div className="p-6 rounded-lg">
          {children}
        </div>
      </GradientBorder>
    </motion.div>
  );
};

export default AnimatedCard;
