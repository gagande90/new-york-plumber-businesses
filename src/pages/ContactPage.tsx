
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
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-primary mb-6">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Have questions about our plumbers directory? Want to list your plumbing business? Fill out the form below and we'll get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Phone</h3>
                    <p className="text-gray-600 mb-1">Main Office:</p>
                    <p className="text-primary font-medium">
                      <a href="tel:(03) 9123 4567">(03) 9123 4567</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Email</h3>
                    <p className="text-gray-600 mb-1">Customer Support:</p>
                    <p className="text-primary font-medium">
                      <a href="mailto:info@melbourneplumbers.com.au">info@melbourneplumbers.com.au</a>
                    </p>
                    <p className="text-gray-600 mt-2 mb-1">Business Listings:</p>
                    <p className="text-primary font-medium">
                      <a href="mailto:listings@melbourneplumbers.com.au">listings@melbourneplumbers.com.au</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Address</h3>
                    <p className="text-gray-600">
                      123 Plumber Avenue<br />
                      New York, NY 10001<br />
                      USA
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Office Hours</h3>
                    <div className="text-gray-600">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span>10:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary-light rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">For Plumbers</h3>
              <p className="text-gray-700 mb-4">
                Are you a plumber in New York looking to join our directory? We'd love to help you connect with new customers.
              </p>
              <p className="text-gray-700">
                Contact us at <a href="mailto:listings@nyplumbers.com" className="text-primary font-medium">listings@nyplumbers.com</a> or fill out the contact form with your business details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
