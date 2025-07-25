import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, School, Award } from 'lucide-react';
import { useVoiceHover } from '@/hooks/useVoiceHover';

const educationData = [
  {
    id: 'btech',
    degree: 'B.Tech',
    institution: 'Indira Gandhi Delhi Technical University For Women',
    year: '2022-2026',
    score: '7.61 CGPA',
    percentage: 76.1,
    icon: GraduationCap,
    description: 'Computer Science With Artificial Intelligence'
  },
  {
    id: '12th',
    degree: '12th Grade (CBSE)',
    institution: 'Govt Girls Senior Secondary School Molarband No.1',
    year: '2021-2022',
    score: '86%',
    percentage: 86,
    icon: School,
    description: 'Science Stream with maths'
  },
  {
    id: '10th',
    degree: '10th Grade (CBSE)',
    institution: 'Govt Girls Senior Secondary School Molarband No.3',
    year: '2019-2020',
    score: '75.5%',
    percentage: 75,
    icon: Award,
    description: 'Strong foundation in Mathematics and Science'
  }
];

export const EducationSection = () => {
  const [visibleCards, setVisibleCards] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { handleEducationHover } = useVoiceHover();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards in sequence
            educationData.forEach((item, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, item.id]);
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="py-20 relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-foreground mb-4">
            Education Journey
          </h2>
          <p className="text-xl text-muted-foreground font-robot">
            Building knowledge through continuous learning
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Education Cards */}
          <div className="space-y-6">
            {educationData.map((item, index) => {
              const Icon = item.icon;
              const isVisible = visibleCards.includes(item.id);
              
              return (
                <Card
                  key={item.id}
                  data-education-card
                  className={`
                    bg-card/50 backdrop-blur-lg border-accent/30 hover:border-accent/60 
                    transition-all duration-500 hover:shadow-neon
                    ${isVisible ? 'opacity-100 animate-slide-in-right' : 'opacity-0'}
                  `}
                  style={{ animationDelay: `${index * 300}ms` }}
                  onMouseEnter={() => handleEducationHover({
                    degree: item.degree,
                    institution: item.institution,
                    year: item.year
                  })}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/20 rounded-lg">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-robot font-semibold text-foreground mb-1">
                          {item.degree}
                        </h3>
                        <p className="text-accent font-medium mb-2">
                          {item.institution}
                        </p>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-muted-foreground">{item.year}</span>
                          <span className="text-lg font-bold text-accent">{item.score}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Right Side - Rotating Wheel */}
          <div className="flex justify-center">
            <div className="relative w-80 h-80">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-4 border-accent/30 animate-rotate-slow">
                <div className="absolute inset-4 rounded-full border-2 border-accent/50">
                  <div className="absolute inset-4 rounded-full border border-accent/70 bg-gradient-neon/10">
                    {/* Center circle */}
                    <div className="absolute inset-8 rounded-full bg-card/80 backdrop-blur-lg border-2 border-accent flex items-center justify-center">
                      <div className="text-center">
                        <GraduationCap className="w-12 h-12 text-accent mx-auto mb-2" />
                        <p className="text-sm font-robot font-semibold text-accent">
                          Education
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating education scores */}
              {educationData.map((item, index) => {
                const angle = (index * 120) * (Math.PI / 180); // 120 degrees apart
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isVisible = visibleCards.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className={`
                      absolute w-16 h-16 rounded-full bg-accent/20 backdrop-blur-lg 
                      border-2 border-accent flex items-center justify-center
                      transition-all duration-500 hover:scale-110 hover:bg-accent/30
                      ${isVisible ? 'opacity-100 animate-scale-in' : 'opacity-0'}
                    `}
                    style={{
                      left: `calc(50% + ${x}px - 2rem)`,
                      top: `calc(50% + ${y}px - 2rem)`,
                      animationDelay: `${index * 300 + 600}ms`
                    }}
                  >
                    <span className="text-xs font-bold text-accent text-center leading-tight">
                      {item.score.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};