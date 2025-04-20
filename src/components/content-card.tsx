import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ContentCardProp {
  content: {
    contentName: string;
    contentType: string;
  };
}

export default function ContentCard({ content }: ContentCardProp) {
  return (
    <Card className="h-[120px]">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">
          {content.contentName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <Badge variant="outline" className="text-sm text-foreground">
          {content.contentType}
        </Badge>
        <Button className="cursor-pointer" variant="link">
          View
        </Button>
      </CardContent>
    </Card>
  );
}
