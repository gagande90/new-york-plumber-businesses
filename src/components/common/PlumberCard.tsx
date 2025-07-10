
import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plumber } from "@/types";
import { suburbs } from "@/data/mockData";

interface PlumberCardProps {
  plumber: Plumber;
  featured?: boolean;
}

const PlumberCard = ({ plumber, featured = false }: PlumberCardProps) => {
  // Get suburb names from IDs
  const suburbNames = plumber.areasServiced.map(id => {
    const suburb = suburbs.find(s => s.id === id);
    return suburb ? suburb.name : "";
  }).filter(Boolean);

  return (
    <div 
      className={`border rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg ${
        featured ? "border-primary-light bg-blue-50" : ""
      }`}
    >
      {featured && (
        <div className="bg-primary text-white text-center py-1 text-xs font-semibold">
          FEATURED PLUMBER
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-xl text-primary mb-2">
              {plumber.businessName}
            </h3>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {plumber.description}
        </p>
        
        <div className="mb-4">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Services:</h4>
          <div className="flex flex-wrap gap-2">
            {plumber.services.slice(0, 3).map((service) => (
              <Badge key={service} variant="outline" className="bg-blue-50">
                {service}
              </Badge>
            ))}
            {plumber.services.length > 3 && (
              <Badge variant="outline" className="bg-blue-50">
                +{plumber.services.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-sm text-gray-700 mb-1">Areas Serviced:</h4>
          <div className="flex items-start">
            <MapPin size={16} className="text-primary mt-1 mr-1 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              {suburbNames.slice(0, 3).join(", ")}
              {suburbNames.length > 3 && ` +${suburbNames.length - 3} more areas`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-5">
          <Link to={`/plumber/${plumber.id}`}>
            <Button variant="outline">View Details</Button>
          </Link>
          <a href={`tel:${plumber.phone}`}>
            <Button>
              <Phone size={16} className="mr-1" />
              Call Now
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlumberCard;
