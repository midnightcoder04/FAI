import { useState } from "react";
import PredictionForm, { FormData } from "@/components/PredictionForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import FloatingParticles from "@/components/FloatingParticles";
import { Sprout } from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";
import { toast } from "sonner";

const Index = () => {
  const [predictedYield, setPredictedYield] = useState<number | null>(null);

  const handlePredict = (data: FormData) => {
    // Mock prediction logic - in real app, this would call an ML API
    const baseYield = 5.0;
    const rainfallFactor = parseFloat(data.rainfall) / 1000;
    const tempFactor = parseFloat(data.temperature) / 25;
    const pesticideFactor = parseFloat(data.pesticides) / 20;

    const prediction =
      baseYield * (0.6 + rainfallFactor * 0.2 + tempFactor * 0.15 + pesticideFactor * 0.05);

    setPredictedYield(prediction);
    
    toast.success("Yield prediction calculated successfully!", {
      description: `Predicted yield: ${prediction.toFixed(2)} tonnes/ha`,
    });

    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${farmHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/80" />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 space-y-12">
        {/* Header */}
        <header className="text-center space-y-6 py-8">
          <div className="flex justify-center">
            <div className="glass rounded-full p-6 inline-block animate-float glow-accent">
              <Sprout className="text-accent" size={64} />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Crop Yield Predictor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Harness the power of data to predict agricultural yields with precision
          </p>
        </header>

        {/* Prediction Form */}
        <section>
          <PredictionForm onPredict={handlePredict} />
        </section>

        {/* Results Display */}
        {predictedYield !== null && (
          <section id="results" className="pt-12">
            <ResultsDisplay predictedYield={predictedYield} />
          </section>
        )}

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm py-8">
          <p>Powered by advanced agricultural analytics</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
