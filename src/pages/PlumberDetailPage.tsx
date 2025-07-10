
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Phone, Mail, Globe, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHero from "@/components/common/PageHero";
import { getPlumberById } from "@/utils/plumberLoader";
import { getSuburbs } from "@/utils/suburbLoader";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";

const PlumberDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const plumber = id ? getPlumberById(id) : null;

  if (!plumber) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Plumber Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the plumber you're looking for.</p>
        <Link to="/suburbs">
          <Button>Browse All Plumbers</Button>
        </Link>
      </div>
    );
  }

  // Get suburb names from IDs
  const servicedSuburbs = plumber.areasServiced.map(id => {
    const suburb = getSuburbs().find(s => s.id === id);
    return suburb || null;
  }).filter(Boolean);
  
  return (
    <div>
      <PageHero
        title={plumber.businessName}
        subtitle="Professional Plumbing Services in Melbourne"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={14} className="mx-1" />
          <Link to="/suburbs" className="hover:text-primary">Plumbers</Link>
          <ChevronRight size={14} className="mx-1" />
          <span className="text-gray-800 font-medium">{plumber.businessName}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-primary">{plumber.businessName}</h1>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">About</h2>
                <MarkdownRenderer content={plumber.content || plumber.description} className="text-gray-700" />
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Services Offered</h2>
                <div className="flex flex-wrap gap-2">
                  {plumber.services.map(service => (
                    <Badge key={service} variant="outline" className="bg-blue-50">
                      <CheckCircle size={14} className="mr-1 text-green-600" />
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">Areas Serviced</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {servicedSuburbs.map(suburb => (
                    <div
                      key={suburb.id}
                      className="flex items-center p-2 rounded-md"
                    >
                      <MapPin size={14} className="text-primary mr-1" />
                      <span className="text-sm">{suburb.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center mr-3">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <a href={`tel:${plumber.phone}`} className="text-primary hover:underline">
                      {plumber.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center mr-3">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <a href={`mailto:${plumber.email}`} className="text-primary hover:underline">
                      {plumber.email}
                    </a>
                  </div>
                </div>
                
                {plumber.website && (
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center mr-3">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Website</div>
                      <a 
                        href={plumber.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary hover:underline"
                      >
                        {plumber.website.replace(/(^\w+:|^)\/\//, '')}
                      </a>
                    </div>
                  </div>
                )}
                
                {plumber.address && (
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center mr-3">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Address</div>
                      <div>{plumber.address}</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 space-y-3">
                <a href={`tel:${plumber.phone}`}>
                  <Button className="w-full">
                    <Phone size={16} className="mr-2" />
                    Call Now
                  </Button>
                </a>
                <a href={`mailto:${plumber.email}`}>
                  <Button variant="outline" className="w-full">
                    <Mail size={16} className="mr-2" />
                    Send Email
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="bg-secondary-light rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-3">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
                <div className="pt-2 font-medium text-primary">
                  24/7 Emergency Service Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlumberDetailPage;
