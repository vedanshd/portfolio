import { ReactNode } from "react";

interface GradientBorderProps {
  children: ReactNode;
}

const GradientBorder = ({ children }: GradientBorderProps) => {
  return (
    <div className="relative bg-primary border border-accent/20 rounded-lg shadow-xl overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-accent via-accent/50 to-accent/10" />
      </div>
      {children}
    </div>
  );
};

export default GradientBorder;
