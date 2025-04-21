import { useState } from "react";
import { SectionCheckboxForm } from "@/components/section-checkbox-form";
import { DraggableSections } from "@/components/draggable-sections";

export default function ReadmeSectionPage() {
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  return (
    <div className="grid grid-cols-1  max-h-full scroll-smooth min-h-screen gap-6 p-6 md:grid-cols-2">
      <div className="border rounded-lg h-[80vh] overflow-x-hidden overflow-scroll  p-4">
        <h2 className="text-lg font-bold pb-4">Select sections of README</h2>
        <h3 className="text-md mb-4 font-bold text-primary">
          Scroll and click continue (refresh to reset state)
        </h3>
        <SectionCheckboxForm
          onSubmit={(sections) => setSelectedSections(sections)}
        />
      </div>
      <div className="border rounded-lg h-[80vh] overflow-x-hidden overflow-scroll p-4">
        <h2 className="text-lg font-bold mb-4">Sections in your README</h2>
        {selectedSections.length > 0 && (
          <DraggableSections initialSections={selectedSections} />
        )}
      </div>
    </div>
  );
}
