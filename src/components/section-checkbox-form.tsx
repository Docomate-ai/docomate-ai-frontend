import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import sections from "@/lib/sections";

const formSchema = z.object({
  sections: z.array(z.string()).optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

type SectionOption = {
  id: string;
  label: string;
  description: string;
};

export function SectionCheckboxForm({
  onSubmit,
}: {
  onSubmit: (selected: string[]) => void;
}) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sections: [],
    },
  });

  const sectionsList: SectionOption[] = sections;

  const handleSubmit: SubmitHandler<FormSchemaType> = (data) => {
    onSubmit(data.sections || []);
    setFormSubmitted(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {sectionsList.map((section) => (
          <FormField
            key={section.id}
            control={form.control}
            name="sections"
            render={({ field }) => {
              const isChecked = field.value?.includes(section.id);
              return (
                <FormItem className="flex items-start space-x-3 border p-3 rounded-md shadow">
                  <FormControl>
                    <Checkbox
                      disabled={formSubmitted}
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), section.id]
                          : (field.value || []).filter((v) => v !== section.id);
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <div>
                    <FormLabel className="font-bold">{section.label}</FormLabel>
                    <p className="text-muted-foreground text-sm">
                      {section.description}
                    </p>
                  </div>
                </FormItem>
              );
            }}
          />
        ))}
        <Button type="submit" disabled={formSubmitted}>
          Continue
        </Button>
      </form>
    </Form>
  );
}
