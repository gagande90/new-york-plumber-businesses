
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { suburbs } from "@/data/mockData";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ placeholder = "Search for suburbs...", className = "" }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const filteredSuburbs = suburbs
    .filter(suburb => 
      suburb.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  const handleSuburbClick = (slug: string) => {
    navigate(`/suburb/${slug}`);
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex w-full">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for plumbers, services, or suburbs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-nyc-empire focus:border-nyc-empire transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-nyc-broadway transition-colors" />
            </button>
          )}
        </div>
        <Button type="submit" className="rounded-l-none h-12">
          <Search className="h-5 w-5" />
          <span className="ml-2 hidden sm:inline">Search</span>
        </Button>
      </form>

      {showResults && filteredSuburbs.length > 0 && (
        <div className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg border border-gray-300">
          <ul>
            {filteredSuburbs.map(suburb => (
              <li
                key={suburb.id}
                onClick={() => handleSuburbClick(suburb.slug)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              >
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span>
                  {suburb.name} <span className="text-sm text-gray-500">({suburb.region})</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
