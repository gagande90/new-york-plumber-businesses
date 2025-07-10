
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

  return (
    <div className="w-full">
      <div className="mb-6 p-4 bg-secondary-light rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Melbourne Suburbs by Region</h3>
        <p className="text-gray-600 text-sm">
          Browse plumbers by Melbourne regions and suburbs. Click on any suburb to find plumbers servicing that area.
        </p>
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
