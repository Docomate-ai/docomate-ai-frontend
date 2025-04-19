import { useState } from "react";
import { SectionCheckboxForm } from "@/components/section-checkbox-form";
import { DraggableSections } from "@/components/draggable-sections";

export default function ReadmeSectionPage() {
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      <div className="border rounded-lg h-[80vh] overflow-scroll p-4">
        <h2 className="text-lg font-bold  pb-4">Sections of your README</h2>
        <SectionCheckboxForm
          onSubmit={(sections) => setSelectedSections(sections)}
        />
      </div>
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4">
          Sections you want in your README
        </h2>
        {selectedSections.length > 0 && (
          <DraggableSections initialSections={selectedSections} />
        )}
      </div>
    </div>
  );
}
