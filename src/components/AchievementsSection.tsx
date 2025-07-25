import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useVoiceHover } from '@/hooks/useVoiceHover';
import { Description } from '@radix-ui/react-toast';

const achievementsData = [
  {
    title: "Psychology of Language under IIT Guwahati",
    organization: "NPTEL",
    date: "2024",
    type: "certification",
    certificateUrl: "https://drive.google.com/file/d/1a0D98ZCRf7_h_Q0DFsiIR5fReH5HuDzF/view?usp=drivesdk"
  },
  {
    title: "Soft Skills and Personality Development under IIT Kanpur",
    organization: "NPTEL",
    date: "2023",
    type: "certification",
    certificateUrl: "https://drive.google.com/file/d/1N_czq-APItU9RR_LoBfFsknMzeLcSDOV/view?usp=drivesdk"
  },
  {
    title: "Viksit Bharat",
    organization: "Govt of India",
    date: "2023",
    type: "certification",
    certificateUrl: "https://drive.google.com/file/d/1ARnAW6NYPHsNzVLMWNJVzAfkZaT8Dz88/view?usp=drivesdk"
  },
  {
    title: "completed Web and application development training",
    organization: "IGDTUW-Anveshan Foundation",
    date: "2023",
    type: "certification",
    certificateUrl: "https://drive.google.com/file/d/1HCp_1LAmhtekPWxRgbqZebTQwjGS6_tL/view?usp=drivesdk"
  },
  {
    title: "Desh Ka Mentor",
    organization: "Ministry of Education, Delhi",
    date: "2023",
    type: "certification",
    certificateUrl:"#",
  },
  // {
  //   title: "Certificate (to be added later)",
  //   organization: "Coming Soon",
  //   date: "2024",
  //   type: "placeholder",
  //   certificateUrl: null
  // }
];

export const AchievementsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { handleAchievementHover } = useVoiceHover();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
    <section id="achievements" className="py-20 bg-background relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-foreground mb-4">
            Achievements & Certifications
          </h2>
          <p className="text-xl text-muted-foreground font-robot">
            Recognition and milestones in my development journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {achievementsData.map((item, index) => (
            <div
              key={index}
              className={`group relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                data-achievement-card
                className={`h-full p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(183,28,28,0.4)] ${
                  item.type === 'placeholder' 
                    ? 'bg-background/50 border-accent/20 border-dashed' 
                    : 'bg-[#1a1a1a] border-accent/30 hover:border-accent/60'
                }`}
                onMouseEnter={() => item.type !== 'placeholder' && handleAchievementHover({
                  title: item.title,
                  organization: item.organization
                })}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
               

                <div className="relative z-10">
                  <h3 className={`text-xl font-cyber font-bold mb-3 transition-colors duration-300 ${
                    item.type === 'placeholder' 
                      ? 'text-muted-foreground' 
                      : 'text-accent group-hover:text-accent'
                  }`}>
                    {item.title}
                  </h3>
                  
                  <p className={`font-robot font-medium mb-2 ${
                    item.type === 'placeholder' 
                      ? 'text-muted-foreground/60' 
                      : 'text-foreground/90'
                  }`}>
                    {item.organization}
                  </p>
                  
                  <p className={`text-sm font-robot ${
                    item.type === 'placeholder' 
                      ? 'text-muted-foreground/50' 
                      : 'text-muted-foreground/80'
                  }`}>
                    {item.date}
                  </p>

                  {/* Certificate Button */}
                  {item.certificateUrl && item.type !== 'placeholder' && (
                    <div className="mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-accent/50 text-accent hover:bg-accent/10 hover:border-accent transition-all duration-300"
                        onClick={() => window.open(item.certificateUrl, '_blank')}
                      >
                        View Certificate
                      </Button>
                    </div>
                  )}
                </div>

                {/* Sparkle Effects */}
                {item.type !== 'placeholder' && (
                  <>
                    <div className="absolute top-4 right-4 w-1 h-1 bg-accent rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 w-0.5 h-0.5 bg-accent/70 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};