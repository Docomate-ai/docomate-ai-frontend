import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";

type DraggableSectionsProps = {
  initialSections: string[];
};

export function DraggableSections({ initialSections }: DraggableSectionsProps) {
  const { id } = useParams();
  const [items, setItems] = useState(initialSections);
  const navigate = useNavigate();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over?.id as string);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleNext = () => {
    const encoded = encodeURIComponent(JSON.stringify(items));
    navigate(`/project/${id}/readme?sections=${encoded}`);
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>
      </DndContext>
      <Button onClick={handleNext} className="mt-4">
        Next
      </Button>
    </div>
  );
}

function SortableItem({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 border rounded-md bg-muted cursor-move"
    >
      {id}
    </div>
  );
}
