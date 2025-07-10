
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/common/PageHero";
import PlumberCard from "@/components/common/PlumberCard";
import { suburbs, plumbers } from "@/data/mockData";
import { Plumber } from "@/types";

const SearchPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlumbers, setFilteredPlumbers] = useState<Plumber[]>([]);
  const [filteredSuburbs, setFilteredSuburbs] = useState<typeof suburbs>([]);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);
    
    if (query) {
      // Filter suburbs
      const matchedSuburbs = suburbs.filter(suburb => 
        suburb.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuburbs(matchedSuburbs);
      
      // Get IDs of matched suburbs
      const matchedSuburbIds = matchedSuburbs.map(suburb => suburb.id);
      
      // Filter plumbers that service any of the matched suburbs
      const matchedPlumbers = plumbers.filter(plumber => 
        plumber.areasServiced.some(areaId => matchedSuburbIds.includes(areaId)) || 
        plumber.businessName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPlumbers(matchedPlumbers);
    } else {
      setFilteredSuburbs([]);
      setFilteredPlumbers([]);
    }
  }, [location.search]);

  if (!searchQuery) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">No Search Query Provided</h1>
        <p className="mb-6">Please enter a search term to find plumbers or suburbs.</p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={`Search Results for "${searchQuery}"`}
        subtitle="Browse plumbers and suburbs matching your search."
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={14} className="mx-1" />
          <span className="text-gray-800 font-medium">
            Search: {searchQuery}
          </span>
        </div>
        
        {/* Matched Suburbs */}
        {filteredSuburbs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-6">
              Matched Suburbs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredSuburbs.map(suburb => (
                <Link
                  key={suburb.id}
                  to={`/suburb/${suburb.slug}`}
                  className="bg-white rounded-md shadow-sm p-4 hover:shadow-md transition-shadow flex items-start"
                >
                  <MapPin size={18} className="text-primary mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium">{suburb.name}</div>
                    <div className="text-xs text-gray-500">{suburb.region}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Matched Plumbers */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            {filteredPlumbers.length > 0 ? `Plumbers (${filteredPlumbers.length} results)` : "No Matching Plumbers"}
          </h2>
          
          {filteredPlumbers.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPlumbers.map(plumber => (
                <PlumberCard key={plumber.id} plumber={plumber} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Search size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                No plumbers found matching "{searchQuery}".
              </p>
              <p className="text-gray-600 mb-6">
                Try broadening your search terms or browse by region instead.
              </p>
              <Link to="/suburbs">
                <Button>Browse All Regions</Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* No Results */}
        {filteredSuburbs.length === 0 && filteredPlumbers.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Search size={64} className="text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-primary mb-4">
              No Results Found
            </h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              We couldn't find any plumbers or suburbs matching "{searchQuery}". Please try another search term or browse our directory by region.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
              <Link to="/suburbs">
                <Button>Browse All Regions</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
