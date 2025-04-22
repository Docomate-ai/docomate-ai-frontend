import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, MessageSquare } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="min-h-[90vh] bg-background flex items-center justify-center px-4">
      <Card className="max-w-xl w-full p-6 rounded-2xl shadow-2xl bg-card backdrop-blur-lg border border-border">
        <CardContent className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-card-foreground text-sm font-medium bg-muted px-3 py-1 rounded-full">
            <MessageSquare className="w-4 h-4" />
            Coming Soon
          </div>

          <h1 className="text-foreground text-3xl md:text-4xl font-extrabold">
            Talk with your codebase.
          </h1>

          <p className="text-muted-foreground text-sm md:text-base">
            Our new Docomate AI feature helps you interact with your codebase
            using natural language. It’s almost ready — stay tuned!
          </p>

          <div className="pt-2">
            <Button className="bg-primary text-primary-foreground hover:bg-sidebar-primary transition rounded-full px-6 py-2 font-semibold">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Launching Soon
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
