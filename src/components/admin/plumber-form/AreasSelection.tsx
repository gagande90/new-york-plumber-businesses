
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Suburb } from "@/types";

interface SuburbsByRegion {
  [key: string]: Suburb[];
}

interface AreasSelectionProps {
  suburbsByRegion: SuburbsByRegion;
  selectedAreas: string[];
  onSuburbToggle: (suburbId: string) => void;
}

const AreasSelection = ({
  suburbsByRegion,
  selectedAreas,
  onSuburbToggle,
}: AreasSelectionProps) => {
  return (
    <div>
      <Label>
        Areas Serviced <span className="text-red-500">*</span>
      </Label>
      <div className="mt-2 border rounded-md p-4 max-h-96 overflow-y-auto">
        {Object.entries(suburbsByRegion).map(([region, regionSuburbs]) => (
          <div key={region} className="mb-4">
            <h4 className="font-medium mb-2">{region}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {regionSuburbs.map((suburb) => (
                <div key={suburb.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`suburb-${suburb.id}`}
                    checked={selectedAreas.includes(suburb.id)}
                    onCheckedChange={() => onSuburbToggle(suburb.id)}
                  />
                  <label
                    htmlFor={`suburb-${suburb.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {suburb.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreasSelection;
