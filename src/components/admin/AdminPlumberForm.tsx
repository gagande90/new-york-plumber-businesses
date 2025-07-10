
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plumber, Suburb } from "@/types";
import { suburbs } from "@/data/mockData";
import BasicInfoFields from "./plumber-form/BasicInfoFields";
import ServicesSelection from "./plumber-form/ServicesSelection";
import AreasSelection from "./plumber-form/AreasSelection";
import FormActions from "./plumber-form/FormActions";
import { availableServices, defaultPlumber } from "./plumber-form/constants";

interface AdminPlumberFormProps {
  plumber?: Partial<Plumber>;
  onSave: (plumber: Partial<Plumber>) => void;
  onCancel: () => void;
}

const AdminPlumberForm = ({ 
  plumber = defaultPlumber, 
  onSave, 
  onCancel 
}: AdminPlumberFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Plumber>>(plumber);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Group suburbs by region
  const suburbsByRegion: { [key: string]: Suburb[] } = {};
  suburbs.forEach(suburb => {
    if (!suburbsByRegion[suburb.region]) {
      suburbsByRegion[suburb.region] = [];
    }
    suburbsByRegion[suburb.region].push(suburb);
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      const currentServices = prev.services || [];
      if (currentServices.includes(service)) {
        return {
          ...prev,
          services: currentServices.filter(s => s !== service)
        };
      } else {
        return {
          ...prev,
          services: [...currentServices, service]
        };
      }
    });
  };

  const handleSuburbToggle = (suburbId: string) => {
    setFormData(prev => {
      const currentSuburbs = prev.areasServiced || [];
      if (currentSuburbs.includes(suburbId)) {
        return {
          ...prev,
          areasServiced: currentSuburbs.filter(id => id !== suburbId)
        };
      } else {
        return {
          ...prev,
          areasServiced: [...currentSuburbs, suburbId]
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!formData.businessName || !formData.phone || !formData.email) {
        throw new Error("Please fill in all required fields");
      }
      
      if (!formData.services || formData.services.length === 0) {
        throw new Error("Please select at least one service");
      }
      
      if (!formData.areasServiced || formData.areasServiced.length === 0) {
        throw new Error("Please select at least one serviced area");
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(formData);
      toast({
        title: "Success!",
        description: `Plumber ${formData.id ? "updated" : "added"} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfoFields formData={formData} handleChange={handleChange} />
      
      <ServicesSelection
        availableServices={availableServices}
        selectedServices={formData.services || []}
        onServiceToggle={handleServiceToggle}
      />
      
      <AreasSelection
        suburbsByRegion={suburbsByRegion}
        selectedAreas={formData.areasServiced || []}
        onSuburbToggle={handleSuburbToggle}
      />
      
      <FormActions onCancel={onCancel} isSubmitting={isSubmitting} />
    </form>
  );
};

export default AdminPlumberForm;
