
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="hidden md:block">
              <h1 className="text-white font-bold text-xl">Melbourne Plumbers</h1>
              <p className="text-white text-xs">Find Local Trusted Professionals</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-secondary-light transition-colors">
              Home
            </Link>
            <Link to="/suburbs" className="text-white hover:text-secondary-light transition-colors">
              Plumbers by Suburb
            </Link>
            <Link to="/blog" className="text-white hover:text-secondary-light transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="text-white hover:text-secondary-light transition-colors">
              Contact
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="bg-white text-primary hover:bg-secondary-light">
                <Phone className="h-4 w-4 mr-2" />
                Emergency Call
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-white block py-2 hover:text-secondary-light transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/suburbs"
                  className="text-white block py-2 hover:text-secondary-light transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Plumbers by Suburb
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-white block py-2 hover:text-secondary-light transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white block py-2 hover:text-secondary-light transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="bg-white text-primary block py-2 px-4 rounded text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Emergency Call
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
