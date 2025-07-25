import { useState, useEffect, useRef } from 'react';
import { TypingText } from './TypingText';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';
import soniPhoto from '@/assets/soni-photo.jpg';

const quotes = [
  "Passionate about creating digital experiences",
  "Turning ideas into interactive realities",
  "Code is poetry, and I'm the poet",
  "Building the future, one line at a time"
];

export const HeroSection = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showQuotes, setShowQuotes] = useState(false);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  const handleNameComplete = () => {
    setTimeout(() => setShowQuotes(true), 500);
  };

  const handleQuoteComplete = () => {
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 2000);
  };

  useEffect(() => {
    if (vantaRef.current && (window as any).VANTA) {
      vantaEffect.current = (window as any).VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xb71c1c,
        backgroundColor: 0x0a0a0a,
        points: 10.00,
        maxDistance: 20.00,
        spacing: 15.00
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Vanta.js NET Background */}
      <div ref={vantaRef} className="absolute inset-0" />
      
      {/* Floating code snippets overlay */}
      <div className="absolute inset-0 z-10 opacity-10">
        <div className="absolute top-20 left-10 text-xs text-accent animate-float" style={{ animationDelay: '0s' }}>
          const developer = "Soni";
        </div>
        <div className="absolute top-40 right-20 text-xs text-accent animate-float" style={{ animationDelay: '1s' }}>
          function createMagic() {"{}"}
        </div>
        <div className="absolute bottom-40 left-20 text-xs text-accent animate-float" style={{ animationDelay: '2s' }}>
          {"{ passion: 'coding' }"}
        </div>
        <div className="absolute bottom-20 right-10 text-xs text-accent animate-float" style={{ animationDelay: '3s' }}>
          return awesomeProjects;
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-cyber font-bold text-foreground mb-4">
                <TypingText 
                  text="Hi, I'm Soni Kumari" 
                  speed={150}
                  onComplete={handleNameComplete}
                />
              </h1>
              <h2 className="text-2xl md:text-4xl font-robot font-medium text-accent" data-title>
                {showQuotes && (
                  <TypingText 
                    text="I'm a Software Developer" 
                    speed={100}
                    delay={500}
                  />
                )}
              </h2>
            </div>

            {/* Rotating Quotes */}
            <div className="h-16 flex items-center">
              {showQuotes && (
                <p className="text-lg md:text-xl text-muted-foreground font-robot" data-description>
                  <TypingText
                    key={currentQuote}
                    text={quotes[currentQuote]}
                    speed={80}
                    delay={1000}
                    onComplete={handleQuoteComplete}
                  />
                </p>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/80 text-primary-foreground font-robot font-semibold shadow-neon hover:shadow-glow transition-all duration-300"
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-robot font-semibold"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </Button>
              <a
                href="https://drive.google.com/file/d/169Cr43nFQdLqm_LGeldDXXfCo9i_TZMP/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-robot font-semibold"
                >
                  Get My Resume
                </Button>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-accent hover:text-accent/80 hover:bg-accent/10"
                asChild
              >
                <a href="https://github.com/SoniKumari17" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-accent hover:text-accent/80 hover:bg-accent/10"
                asChild
              >
                <a href="https://www.linkedin.com/in/soni-kumari-0b27b9258/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-accent hover:text-accent/80 hover:bg-accent/10"
                asChild
              >
                <a href="mailto:sonikumaripr16@gmail.com">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right Side - Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-accent shadow-glow animate-float">
                <img
                  src={soniPhoto}
                  alt="Soni Kumari"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Glow effect behind photo */}
              <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl animate-glow-pulse -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};