import { Card } from "@/components/ui/card";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Pricing</h1>
          <p className="text-lg text-muted-foreground">
            Our pricing page is currently being updated. Please check back soon.
          </p>
        </div>
        
        <Card className="p-12 text-center max-w-2xl mx-auto">
          <p className="text-xl text-muted-foreground">
            Content coming soon...
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;
