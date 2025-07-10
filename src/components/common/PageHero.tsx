
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
  children 
}: PageHeroProps) => {
  return (
    <div className="bg-gradient-to-br from-primary via-nyc-brooklyn to-nyc-manhattan text-white py-16 md:py-24 relative overflow-hidden">
      {/* NYC Skyline Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-nyc-empire">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            {subtitle}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
