
import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  imageUrl?: string;
}

const PageHero = ({ 
  title, 
  subtitle, 
  children, 
  imageUrl = "/images/plumbing-hero.jpg" 
}: PageHeroProps) => {
  return (
    <div 
      className="relative bg-primary py-16 md:py-24 overflow-hidden"
      style={{
        backgroundImage: imageUrl ? `linear-gradient(rgba(10, 61, 98, 0.85), rgba(10, 61, 98, 0.85)), url(${imageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white opacity-90 mb-8">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#ffffff">
          <path d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,53.3C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default PageHero;
