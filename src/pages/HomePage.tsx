
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Search, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageHero from "@/components/common/PageHero";
import SearchBar from "@/components/common/SearchBar";
import PlumberCard from "@/components/common/PlumberCard";
import BlogPostCard from "@/components/common/BlogPostCard";
import { plumbers, blogPosts, regions } from "@/data/mockData";

const HomePage = () => {
  // Get featured plumbers (first 3)
  const featuredPlumbers = plumbers.slice(0, 3);
  
  // Get recent blog posts (first 3)
  const recentPosts = [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Find Trusted Plumbers in Melbourne"
        subtitle="Connect with reliable local plumbing professionals for all your needs."
      >
        <div className="max-w-xl mx-auto">
          <SearchBar 
            placeholder="Enter your suburb..." 
            className="mb-4"
          />
          <p className="text-white text-sm">
            Popular: Docklands, Brunswick, Hawthorn, St Kilda, Footscray
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
              Finding a reliable plumber in Melbourne has never been easier. Follow these simple steps to connect with trusted professionals in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Search Your Suburb</h3>
              <p className="text-gray-600">
                Enter your suburb to find plumbers who service your local area in Melbourne.
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
              Find qualified plumbers servicing all areas across Melbourne.
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
                View All Melbourne Suburbs
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Plumbers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Featured Plumbers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Top-rated plumbing professionals serving the Melbourne area.
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

      {/* Did You Know Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Did You Know?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold mb-2">78%</div>
                <p>of Melbourne homes will experience a serious plumbing issue within a 5-year period</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">15,000L</div>
                <p>of water can be wasted annually from a single dripping tap</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24hr</div>
                <p>is the average response time for emergency plumbers in Melbourne</p>
              </div>
            </div>
            <p className="text-lg">
              Don't wait for a plumbing emergency! Regular maintenance by qualified plumbers can save you thousands.
            </p>
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
