
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/common/PageHero";
import SuburbsMap from "@/components/features/SuburbsMap";
import { suburbs, regions } from "@/data/mockData";
import { Region } from "@/types";

const SuburbsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get initial active region from URL params
  const params = new URLSearchParams(location.search);
  const regionParam = params.get("region");
  const [activeRegion, setActiveRegion] = useState<Region | null>(
    regionParam as Region || null
  );

  // Filter suburbs based on active region and search query
  const filteredSuburbs = suburbs.filter(suburb => {
    const matchesRegion = !activeRegion || suburb.region === activeRegion;
    const matchesSearch = !searchQuery || 
      suburb.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleRegionClick = (region: Region | null) => {
    setActiveRegion(region);
    // Update URL without reloading page
    if (region) {
      navigate(`/suburbs?region=${encodeURIComponent(region)}`);
    } else {
      navigate("/suburbs");
    }
  };

  const handleSuburbClick = (slug: string) => {
    navigate(`/suburb/${slug}`);
  };

  return (
    <div>
      <PageHero
        title="Plumbers by Melbourne Suburb"
        subtitle="Browse our directory of plumbers by suburb to find professionals in your area."
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Search and filters */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Find Plumbers
              </h2>
              
              <form onSubmit={handleSearch}>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Search suburbs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Filter by Region</h3>
                  <div className="space-y-2">
                    <button
                      className={`px-3 py-2 rounded-md text-sm w-full text-left ${
                        activeRegion === null
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() => handleRegionClick(null)}
                    >
                      All Regions
                    </button>
                    
                    {Object.keys(regions).map((region) => (
                      <button
                        key={region}
                        className={`px-3 py-2 rounded-md text-sm w-full text-left ${
                          activeRegion === region
                            ? "bg-primary text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => handleRegionClick(region as Region)}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </div>
            
            <div className="bg-primary rounded-lg shadow-md p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">
                Need Emergency Plumbing?
              </h2>
              <p className="mb-4">
                Don't wait! Connect with emergency plumbers in Melbourne who can help you right away.
              </p>
              <Button 
                variant="outline" 
                className="w-full bg-white text-primary hover:bg-gray-100"
              >
                Find Emergency Plumbers
              </Button>
            </div>
          </div>
          
          {/* Right column - Suburbs list */}
          <div className="lg:col-span-2">
            {searchQuery || activeRegion ? (
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-6">
                  {activeRegion ? `${activeRegion} Suburbs` : "Search Results"}
                </h2>
                
                <div className="bg-white rounded-lg shadow-md">
                  {filteredSuburbs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
                      {filteredSuburbs.map(suburb => (
                        <button
                          key={suburb.id}
                          onClick={() => handleSuburbClick(suburb.slug)}
                          className="flex items-center p-3 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <MapPin size={18} className="text-primary mr-2" />
                          <div className="text-left">
                            <div className="font-medium">{suburb.name}</div>
                            <div className="text-xs text-gray-500">{suburb.region}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-gray-500">
                        No suburbs found matching your search criteria.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <SuburbsMap />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuburbsPage;
