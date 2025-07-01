import { TypingAnimation } from "@/components/animations/TypingAnimation";

export default function TypingDemo() {
  const phrases = [
    "Web Developer",
    "UI/UX Designer",
    "Tech Enthusiast",
    "Problem Solver",
    "Creative Thinker"
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          I am a{" "}
          <TypingAnimation 
            phrases={phrases} 
            typingSpeed={100} 
            deletingSpeed={50} 
            pauseDuration={1500} 
            className="text-primary"
          />
        </h1>
        
        <div className="mt-16 max-w-xl mx-auto p-6 bg-card rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">About This Component</h2>
          <p className="text-left mb-4">
            This is a custom typing animation component built with vanilla JavaScript (no external libraries).
            It features:
          </p>
          <ul className="list-disc text-left ml-6 mb-4 space-y-2">
            <li>Smooth typing and deleting animations</li>
            <li>Customizable typing speed, deleting speed, and pause duration</li>
            <li>Blinking cursor effect</li>
            <li>Responsive design that works on all screen sizes</li>
            <li>Easy to customize with different phrases</li>
          </ul>
          <p className="text-left">
            The animation continuously loops through the list of phrases, typing each one
            character by character, pausing, and then deleting before moving to the next phrase.
          </p>
        </div>
      </div>
    </div>
  );
}