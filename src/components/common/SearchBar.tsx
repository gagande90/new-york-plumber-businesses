
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
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
          <Input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="pr-10 rounded-r-none h-12"
          />
          {searchQuery && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setSearchQuery("");
                setShowResults(false);
              }}
            >
              &times;
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
