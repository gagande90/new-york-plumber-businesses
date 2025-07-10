
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ServicesSelectionProps {
  availableServices: string[];
  selectedServices: string[];
  onServiceToggle: (service: string) => void;
}

const ServicesSelection = ({
  availableServices,
  selectedServices,
  onServiceToggle,
}: ServicesSelectionProps) => {
  return (
    <div>
      <Label>
        Services <span className="text-red-500">*</span>
      </Label>
      <div className="mt-2 border rounded-md p-4 max-h-60 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableServices.map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={`service-${service}`}
                checked={selectedServices.includes(service)}
                onCheckedChange={() => onServiceToggle(service)}
              />
              <label
                htmlFor={`service-${service}`}
                className="text-sm cursor-pointer"
              >
                {service}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSelection;
