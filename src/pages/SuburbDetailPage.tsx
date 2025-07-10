
import { useParams, Link } from "react-router-dom";
import { ChevronRight, MapPin, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/common/PageHero";
import PlumberCard from "@/components/common/PlumberCard";
import { getSuburbBySlug } from "@/utils/suburbLoader";
import { getPlumbersBySuburb } from "@/utils/plumberLoader";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SuburbDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const suburb = slug ? getSuburbBySlug(slug) : null;
  const plumbers = suburb ? getPlumbersBySuburb(suburb.id) : [];

  // FAQs data for the accordion
  const faqs = [
    {
      question: `How much do plumbers in ${suburb?.name || 'this area'} typically charge?`,
      answer: `Plumbers in ${suburb?.name || 'this area'} typically charge between $100-200 per hour depending on the service complexity, with additional call-out fees for emergency services. Always request a quote before committing to work.`
    },
    {
      question: `Do I need a licensed plumber in ${suburb?.name || 'this area'}?`,
      answer: `Yes, in New York State all plumbing work must be completed by a licensed plumber who will provide a compliance certificate. This ensures the work meets safety standards and building codes.`
    },
    {
      question: `How quickly can I get emergency plumbing service in ${suburb?.name || 'this area'}?`,
      answer: `Most emergency plumbers in ${suburb?.name || 'this area'} can respond within 1-2 hours. Our listed emergency plumbers clearly indicate their response times and emergency call-out capabilities.`
    },
    {
      question: "What plumbing issues should I never attempt to DIY?",
      answer: "You should never attempt to DIY gas fitting, hot water system installations, sewer line repairs, and major pipe relocations. These require professional licensing and expertise, and DIY attempts can be dangerous and illegal."
    },
    {
      question: "How often should I have my plumbing inspected?",
      answer: "It's recommended to have a professional plumbing inspection every 2 years for older homes and every 5 years for newer construction. Regular maintenance can prevent costly emergency repairs and extend the life of your plumbing system."
    },
    {
      question: "What causes low water pressure in my home?",
      answer: "Low water pressure can be caused by clogged pipes, water leaks, corroded plumbing, faulty pressure regulators, or municipal supply issues. A professional plumber can diagnose the specific cause in your home."
    }
  ];

  // Split FAQs into two columns
  const leftColumnFaqs = faqs.slice(0, Math.ceil(faqs.length / 2));
  const rightColumnFaqs = faqs.slice(Math.ceil(faqs.length / 2));

  if (!suburb) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Suburb Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the suburb you're looking for.</p>
        <Link to="/suburbs">
          <Button>Browse All Suburbs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={`Plumbers in ${suburb.name}`}
        subtitle={`Find trusted plumbing professionals serving ${suburb.name}, New York.`}
      >
        <div className="flex items-center justify-center text-white">
          <MapPin size={16} className="mr-1" />
          <span>{suburb.region}</span>
        </div>
      </PageHero>
      
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={14} className="mx-1" />
          <Link to="/suburbs" className="hover:text-primary">Suburbs</Link>
          <ChevronRight size={14} className="mx-1" />
          <Link to={`/suburbs?region=${encodeURIComponent(suburb.region)}`} className="hover:text-primary">
            {suburb.region}
          </Link>
          <ChevronRight size={14} className="mx-1" />
          <span className="text-gray-800 font-medium">{suburb.name}</span>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            About {suburb.name}
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <MarkdownRenderer content={suburb.content || suburb.description} className="text-gray-700 mb-4" />
            <p className="text-gray-700 mt-4">
              Whether you need emergency repairs, regular maintenance, or plumbing installations, 
              our directory of {suburb.name} plumbers have you covered. Browse our listings below to find 
              the right professional for your needs.
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Plumbers Servicing {suburb.name}
          </h2>
          
          {plumbers.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {plumbers.map(plumber => (
                <PlumberCard key={plumber.id} plumber={plumber} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 mb-4">
                We don't have any plumbers listed for {suburb.name} yet.
              </p>
              <p className="text-gray-600 mb-6">
                Are you a plumber servicing this area? Join our directory today!
              </p>
              <Link to="/contact">
                <Button>Contact Us to Get Listed</Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* FAQs Section - Replace Nearby Suburbs */}
        <div className="bg-secondary-light rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <HelpCircle size={20} className="text-primary mr-2" />
            <h2 className="text-xl font-semibold text-primary">
              Frequently Asked Questions about Plumbing in {suburb.name}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column FAQs */}
            <div>
              <Accordion type="single" collapsible className="bg-white rounded-md">
                {leftColumnFaqs.map((faq, index) => (
                  <AccordionItem key={`faq-left-${index}`} value={`faq-left-${index}`}>
                    <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-1 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            {/* Right Column FAQs */}
            <div>
              <Accordion type="single" collapsible className="bg-white rounded-md">
                {rightColumnFaqs.map((faq, index) => (
                  <AccordionItem key={`faq-right-${index}`} value={`faq-right-${index}`}>
                    <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-1 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuburbDetailPage;
