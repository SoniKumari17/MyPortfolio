import { useState, useEffect, useRef } from 'react';
import { useVoiceHover } from '@/hooks/useVoiceHover';

const experienceData = [
  {
    role: "Summer Intern -Web Developer",
    company: "IGDTUW-Anveshan Foundation",
    duration: "June 2023 - July 2023",
    description: "Gained proficiency in HTML, CSS, JavaScript, and digital marketing, along with practical experience in web development, including designing and building responsive websites and applications."
  },
  {
    role: "Web Developer Intern",
    company: "Maven Infos Pvt. Ltd",
    duration: "Dec 2023 - March 2024",
    description: "Built a Hospital Management System to streamline appointments, billing, and records. Boosted data efficiency by 15% using optimized MongoDB queries and improved time management by 30% during a part-time internship alongside academics."
  },
  // {
  //   role: "Junior Web Developer",
  //   company: "StartUp Ventures",
  //   duration: "Mar 2022 - May 2022",
  //   description: "Built a Hospital Management System to streamline appointments, billing, and records. Boosted data efficiency by 15% using optimized MongoDB queries and improved time management by 30% during a part-time internship alongside academics"
  // }
];

export const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { handleExperienceHover } = useVoiceHover();

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
    <section id="experience" className="py-20 bg-background relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-foreground mb-4">
            Experience
          </h2>
          <p className="text-xl text-muted-foreground font-robot">
            My professional journey in software development
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-accent"></div>

          {experienceData.map((exp, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-start mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              } ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-[0_0_15px_rgba(183,28,28,0.5)]"></div>

              {/* Content Card */}
              <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                <div 
                  className="bg-background/90 backdrop-blur-lg border-2 border-accent/30 rounded-xl p-6 shadow-2xl hover:shadow-[0_0_30px_rgba(183,28,28,0.4)] hover:scale-105 transition-all duration-300 group"
                  onMouseEnter={() => handleExperienceHover({
                    role: exp.role,
                    company: exp.company,
                    duration: exp.duration
                  })}
                >
                  {/* Left Border Effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent/70 to-accent rounded-l-xl"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-cyber font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <h4 className="text-xl font-robot font-semibold text-accent mb-2">
                      {exp.company}
                    </h4>
                    <p className="text-sm text-muted-foreground/80 italic mb-4 font-robot">
                      {exp.duration}
                    </p>
                    <p className="text-foreground/90 font-robot leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};