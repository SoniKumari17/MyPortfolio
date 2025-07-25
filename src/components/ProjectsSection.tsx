import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, Eye } from 'lucide-react';
import { useVoiceHover } from '@/hooks/useVoiceHover';

const projects = [
  {
    id: 1,
    title: 'Walmart Grocery',
    description: 'Designed and developed a smart grocery web application for Walmart that simplifies monthly shopping by allowing users to create personalized grocery lists, browse items, and choose between home delivery or store pickup. The platform features loyalty vouchers, monthly reminders, billing management, and personalized offers (e.g., 20% off + free delivery for first-time users, ₹1,000 off for purchases above ₹10,000)..',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Supabase'],
    demoUrl: 'https://monthlysmartlist.netlify.app/',
    githubUrl: 'https://github.com/SoniKumari17',
    featured: true
  },
  {
    id: 2,
    title: 'reunify-Lost and Found',
    description: 'Developed a responsive platform for reporting and locating lost items or individuals, tackling the gap in centralized recovery systems. Key features include user authentication, location-based post submissions, community-driven comments, and reward-enabled listings — enhancing recovery success by up to 3x through local visibility and engagement.',
    techStack: ['React', 'Firebase', 'Material-UI', 'Socket.io'],
    demoUrl: '#',
    githubUrl: 'https://github.com/SoniKumari17/Reunify',
    featured: true
  },
  {
    id: 3,
    title: 'Hospital Management System',
    description: 'Engineered a hospital management system handling 500+ patient records, appointments, and billing entries. Enhanced operational efficiency by 30% through a scalable backend architecture and secure authentication integration using Firebase.',
    techStack: ['JavaScript', 'Node.js', 'Express', 'MongoDB','firebase'],
    demoUrl: '#',
    githubUrl: 'https://github.com/SoniKumari17/hospitalproject',
    featured: true
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'Responsive portfolio website with smooth animations, dark theme, and contact form integration.',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'EmailJS','Three.js'],
    demoUrl: '#',
    githubUrl: '#',
    featured: false
  },
  {
    id: 5,
    title: 'Gamify Waste Management',
    description: 'Developed an interactive web platform to promote daily waste management habits, achieving 200+ user sign-ups. The application features a dynamic leaderboard, reward system, and image upload functionality to incentivize eco-friendly actions. Users earn points by uploading photos of recycled waste, encouraging consistent engagement and environmental responsibility. The platform recorded a 40% increase in user activity post-launch',
    techStack: ['HTML', 'CSS',' Bootstrap', 'JavaScript','MySQL'],
    demoUrl: '#',
    githubUrl: 'https://github.com/SoniKumari17/gamifysoni',
    featured: false
  },
  // {
  //   id: 6,
  //   title: 'Blog Platform',
  //   description: 'Content management system for bloggers with rich text editor, image uploads, and SEO optimization features.',
  //   techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'TinyMCE'],
  //   demoUrl: '#',
  //   githubUrl: '#',
  //   featured: false
  // }
];

export const ProjectsSection = () => {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { handleProjectHover } = useVoiceHover();

  const displayedProjects = showAll ? projects : projects.filter(p => p.featured);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards in sequence
            displayedProjects.forEach((project, index) => {
              setTimeout(() => {
                setVisibleProjects(prev => [...prev, project.id]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [displayedProjects]);

  // Reset visible projects when showAll changes
  useEffect(() => {
    setVisibleProjects([]);
    displayedProjects.forEach((project, index) => {
      setTimeout(() => {
        setVisibleProjects(prev => [...prev, project.id]);
      }, index * 100);
    });
  }, [showAll]);

  return (
    <section id="projects" className="py-20 relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground font-robot">
            Showcasing my latest work and technical expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project, index) => {
            const isVisible = visibleProjects.includes(project.id);
            
            return (
              <Card
                key={project.id}
                className={`
                  group bg-card/50 backdrop-blur-lg border-accent/30 hover:border-accent/60 
                  transition-all duration-500 hover:shadow-neon hover:scale-105
                  ${isVisible ? 'opacity-100 animate-scale-in' : 'opacity-0'}
                `}
                style={{ animationDelay: `${index * 200}ms` }}
                onMouseEnter={() => handleProjectHover({
                  title: project.title,
                  description: project.description,
                  tech: project.techStack
                })}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-robot font-semibold text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </CardTitle>
                    {project.featured && (
                      <Badge variant="outline" className="border-accent text-accent">
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="text-xs bg-accent/20 text-accent border-accent/30"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Show More Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => setShowAll(!showAll)}
            className="bg-primary hover:bg-primary/80 text-primary-foreground font-robot font-semibold shadow-neon hover:shadow-glow transition-all duration-300"
          >
            {showAll ? 'Show Less' : 'Show More Projects'}
          </Button>
        </div>
      </div>
    </section>
  );
};