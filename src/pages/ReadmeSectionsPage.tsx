import { useState } from "react";
import { SectionCheckboxForm } from "@/components/section-checkbox-form";
import { DraggableSections } from "@/components/draggable-sections";

export default function ReadmeSectionPage() {
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  return (
    <div className="grid grid-cols-1s gap-6 p-6 md:grid-cols-2">
      {/* Left Section */}
      <div className="border rounded-lg h-[80vh]  p-4">
        <h2 className="text-lg font-bold pb-4">Select sections of README</h2>
        <h3 className="text-md mb-4 font-bold text-primary">
          refresh to reset state
        </h3>
        <div className="h-[63vh]">
          <SectionCheckboxForm
            onSubmit={(sections) => setSelectedSections(sections)}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="border rounded-lg h-[80vh] overflow-y-auto p-4">
        <h2 className="text-lg font-bold mb-4">Sections in your README</h2>
        {selectedSections.length > 0 && (
          <div className="h-full">
            <DraggableSections initialSections={selectedSections} />
          </div>
        )}
      </div>
    </div>
  );
}
