
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
  delay: number;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home', delay: 0 },
  { label: 'About Me', href: '#about', delay: 200 },
  { label: 'Projects', href: '#projects', delay: 400 },
  { label: 'Work Experience', href: '#experience', delay: 600 },
  { label: 'Contact', href: '#contact', delay: 800 },
];

interface AnimatedNavbarProps {
  isVisible: boolean;
}

export const AnimatedNavbar = ({ isVisible }: AnimatedNavbarProps) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    if (isVisible) {
      navItems.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, index]);
        }, navItems[index].delay);
      });
    } else {
      const reverseItems = [...navItems].reverse();
      reverseItems.forEach((_, reverseIndex) => {
        const originalIndex = navItems.length - 1 - reverseIndex;
        setTimeout(() => {
          setVisibleItems(prev => prev.filter(i => i !== originalIndex));
        }, reverseIndex * 200);
      });
    }
  }, [isVisible]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-card/90 backdrop-blur-lg border-b border-accent/30 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center space-x-8">
          {navItems.map((item, index) => (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(item.href)}
              className={`
                relative text-foreground transition-all duration-300
                font-robot font-medium tracking-wide
                ${visibleItems.includes(index) 
                  ? 'opacity-100 animate-slide-in-right' 
                  : 'opacity-0'
                }
              `}
              style={{
                animationDelay: `${item.delay}ms`,
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};
