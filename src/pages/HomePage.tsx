
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Search, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageHero from "@/components/common/PageHero";
import SearchBar from "@/components/common/SearchBar";
import PlumberCard from "@/components/common/PlumberCard";
import BlogPostCard from "@/components/common/BlogPostCard";
import { plumbers, regions } from "@/data/mockData";
import blogPostsData from "@/data/generatedBlogPosts.json";

const HomePage = () => {
  // Get featured plumbers (first 3)
  const featuredPlumbers = plumbers.slice(0, 3);
  
  // Get recent blog posts from generated data (first 3)
  const recentPosts = [...blogPostsData]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Find Trusted Plumbers in New York"
        subtitle="Connect with reliable local plumbing professionals for all your needs in New York."
      >
        <div className="max-w-xl mx-auto">
          <SearchBar 
            placeholder="Enter your neighborhood..." 
            className="mb-4"
          />
          <p className="text-white text-sm">
            Popular: Upper East Side, Williamsburg, Astoria, Park Slope, Chelsea
          </p>
        </div>
      </PageHero>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Finding a reliable plumber in New York has never been easier. Follow these simple steps to connect with trusted professionals in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Search Your Suburb</h3>
              <p className="text-gray-600">
                Enter your suburb to find plumbers who service your local area in New York.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Compare Services</h3>
              <p className="text-gray-600">
                Review services, expertise, and customer feedback to choose the right plumber.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Get Connected</h3>
              <p className="text-gray-600">
                Contact your chosen plumber directly through our platform for quick service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Region Section */}
      <section className="py-16 bg-secondary-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Browse Plumbers by Region
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find qualified plumbers servicing all areas across New York.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(regions).map((region) => (
              <Card key={region} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {region}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {regions[region as keyof typeof regions].length} suburbs
                      </p>
                      <ul className="text-sm mb-4">
                        {regions[region as keyof typeof regions].slice(0, 3).map((suburb) => (
                          <li key={suburb} className="mb-1">
                            • {suburb}
                          </li>
                        ))}
                        {regions[region as keyof typeof regions].length > 3 && (
                          <li className="text-primary-light">
                            + {regions[region as keyof typeof regions].length - 3} more suburbs
                          </li>
                        )}
                      </ul>
                      <Link 
                        to={`/suburbs?region=${encodeURIComponent(region)}`}
                        className="text-primary font-medium hover:text-primary-light transition-colors flex items-center text-sm"
                      >
                        Browse plumbers in this region
                        <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/suburbs">
              <Button>
                View All New York Neighborhoods
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Plumbers Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-nyc-taxi/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Featured Plumbers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Top-rated plumbing professionals serving the New York area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPlumbers.map((plumber) => (
              <PlumberCard 
                key={plumber.id} 
                plumber={plumber} 
                featured={true} 
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/suburbs">
              <Button>
                Find More Plumbers
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-nyc-brooklyn text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose New York Plumbers?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2 text-nyc-empire">78%</div>
              <p>of New York homes will experience a serious plumbing issue within a 5-year period</p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2 text-nyc-empire">24hr</div>
              <p>is the average response time for emergency plumbers in New York</p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2 text-nyc-empire">100%</div>
              <p>licensed and insured plumbers in our directory</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Plumbing Tips & Advice
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay informed with our latest articles on plumbing maintenance, DIY fixes, and professional advice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/blog">
              <Button>
                View All Articles
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
