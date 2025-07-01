import { useEffect, useRef } from "react";
import "./typing-animation.css";

interface TypingAnimationProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function TypingAnimation({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 1500,
  className = ""
}: TypingAnimationProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    let currentPhraseIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        // Deleting text
        currentText = currentPhrase.substring(0, currentText.length - 1);
      } else {
        // Typing text
        currentText = currentPhrase.substring(0, currentText.length + 1);
      }

      if (textRef.current) {
        textRef.current.textContent = currentText;
      }

      let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && currentText === currentPhrase) {
        // Completed typing the full phrase, pause before deleting
        typeSpeed = pauseDuration;
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        // Completed deleting, move to next phrase
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Slight pause before typing next phrase
      }

      timeout = setTimeout(type, typeSpeed);
    };

    // Start the typing animation
    timeout = setTimeout(type, typingSpeed);

    // Cleanup function to clear timeout when component unmounts
    return () => {
      clearTimeout(timeout);
    };
  }, [phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <div className={`typing-animation-container ${className}`}>
      <span ref={textRef} className="typing-text"></span>
      <span ref={cursorRef} className="typing-cursor">|</span>
    </div>
  );
}