import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="space-y-8">
          {/* Thank you message */}
          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl font-cyber font-bold text-foreground">
              Thanks for visiting my portfolio!
            </h3>
            <p className="text-xl text-muted-foreground font-robot">
              Thank you for visiting my portfolio. I hope you enjoyed exploring it. Keep smiling and stay safe!
            </p>
          </div>

          {/* Rocket back to top button */}
          <div className="flex justify-center">
            <Button
              onClick={scrollToTop}
              size="lg"
              className="
                bg-accent hover:bg-accent/80 text-accent-foreground 
                font-robot font-semibold shadow-neon hover:shadow-glow 
                transition-all duration-300 hover:scale-110 group
                rounded-full px-8 py-6
              "
            >
              <div className="flex items-center gap-3">
                <span>Back to Top</span>
      
              </div>
            </Button>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-accent/30">
            <p className="text-muted-foreground font-robot">
              © 2024 Soni Kumari | Made with React + Tailwind
            </p>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-accent rounded-full animate-float opacity-60" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-accent rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-accent rounded-full animate-float opacity-60" style={{ animationDelay: '3s' }} />
      </div>
    </footer>
  );
};