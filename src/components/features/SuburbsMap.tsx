
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { regions, suburbs } from "@/data/mockData";
import { Region } from "@/types";

const SuburbsMap = () => {
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);
  const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const toggleRegion = (region: Region) => {
    setExpandedRegions(prev => ({
      ...prev,
      [region]: !prev[region]
    }));
  };
  
  const handleSuburbClick = (slug: string) => {
    navigate(`/suburb/${slug}`);
  };

  const handleRegionClick = (region: Region) => {
    setActiveRegion(region);
    setExpandedRegions(prev => ({
      ...prev,
      [region]: !prev[region]
    }));
  };

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-gray-50 to-nyc-taxi/10 rounded-lg p-6 border border-nyc-empire/20">
        <h3 className="text-xl font-semibold text-primary mb-4">New York Service Areas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.keys(regions).map((region) => (
            <div
              key={region}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-nyc-empire hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => handleRegionClick(region as Region)}
            >
              <h4 className="font-medium text-primary group-hover:text-nyc-empire transition-colors">
                {region}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {suburbs.filter(suburb => suburb.region === region).length} areas
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        {Object.keys(regions).map((region) => (
          <div key={region} className="border rounded-md">
            <button
              className="w-full flex items-center justify-between p-4 font-medium text-left bg-white hover:bg-gray-50 transition-colors"
              onClick={() => toggleRegion(region as Region)}
            >
              <span>{region}</span>
              <ChevronDown 
                size={18} 
                className={`transition-transform ${expandedRegions[region] ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {expandedRegions[region] && (
              <div className="p-4 pt-0">
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {suburbs
                    .filter(suburb => suburb.region === region)
                    .map(suburb => (
                      <li key={suburb.id}>
                        <button
                          onClick={() => handleSuburbClick(suburb.slug)}
                          className="py-1 px-2 text-sm rounded hover:bg-primary hover:text-white transition-colors w-full text-left"
                        >
                          {suburb.name}
                        </button>
                      </li>
                    ))
                  }
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuburbsMap;
