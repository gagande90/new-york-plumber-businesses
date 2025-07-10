
import { Link, useNavigate } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plumber } from "@/types";
import { suburbs } from "@/data/mockData";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface PlumberCardProps {
  plumber: Plumber;
  featured?: boolean;
}

const PlumberCard = ({ plumber, featured = false }: PlumberCardProps) => {
  const navigate = useNavigate();
  // Get suburb names from IDs
  const suburbNames = plumber.areasServiced.map(id => {
    const suburb = suburbs.find(s => s.id === id);
    return suburb ? suburb.name : "";
  }).filter(Boolean);

  return (
    <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-all duration-300 border-l-4 border-l-nyc-empire hover:border-l-nyc-taxi">
      <div className="p-6 flex-1">
        <CardTitle className="text-lg font-semibold text-primary mb-2 truncate">
          {plumber.businessName}
        </CardTitle>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {plumber.description}
        </p>
      </div>
      <div className="flex gap-2 p-6 pt-0">
        <Button variant="outline" className="flex-1" onClick={() => navigate(`/plumber/${plumber.id}`)}>
          View Details
        </Button>
        <Button variant="nyc" className="flex-1" asChild>
          <a href={`tel:${plumber.phone}`}>Call Now</a>
        </Button>
      </div>
    </Card>
  );
};

export default PlumberCard;
