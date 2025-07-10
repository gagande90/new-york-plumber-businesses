
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import ContactForm from "@/components/features/ContactForm";

const ContactPage = () => {
  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with our team for any questions or assistance."
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-l-nyc-empire">
            <h2 className="text-2xl font-bold text-primary mb-6">Get in Touch</h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-nyc-empire to-nyc-brooklyn text-white rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-nyc-taxi" />
                  <span>Emergency: (212) 555-0123</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-nyc-taxi" />
                  <span>info@newyorkplumbers.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-nyc-taxi" />
                  <span>New York, NY 10001</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-nyc-taxi/20 to-nyc-empire/20 rounded-lg p-8 border border-nyc-empire/30">
              <h3 className="text-xl font-semibold text-primary mb-4">Service Areas</h3>
              <p className="text-gray-600 mb-4">
                We serve all of New York State including:
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-primary">• Manhattan</span>
                <span className="text-primary">• Brooklyn</span>
                <span className="text-primary">• Queens</span>
                <span className="text-primary">• Bronx</span>
                <span className="text-primary">• Staten Island</span>
                <span className="text-primary">• Long Island</span>
                <span className="text-primary">• Upstate NY</span>
                <span className="text-primary">• Hudson Valley</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
