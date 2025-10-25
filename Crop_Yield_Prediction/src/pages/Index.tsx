import { useState } from "react";
import PredictionForm, { FormData } from "@/components/PredictionForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import FloatingParticles from "@/components/FloatingParticles";
import { Sprout } from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";
import { toast } from "sonner";

interface PredictionResult {
  prediction: number;
  units: string;
  details: any;
}

interface TrendDataPoint {
  crop: string;
  yield: number;
}

const Index = () => {
  const [predictedYield, setPredictedYield] = useState<number | null>(null);
  const [trendData, setTrendData] = useState<TrendDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Random crop selection for comparison
  const allCrops = [
    "Maize", "Plantains and others", "Potatoes", "Rice, paddy", 
    "Sorghum", "Soybeans", "Sweet potatoes", "Wheat", "Yams"
  ];

  const handlePredict = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      const currentYear = parseInt(data.year);
      const predictions: TrendDataPoint[] = [];
      
      console.log('Starting predictions for year:', currentYear);
      console.log('Form data:', data);
      
      // Get the selected crop
      const selectedCrop = data.crop;
      
      // Select 3 other random crops (excluding the selected one)
      const otherCrops = allCrops
        .filter(crop => crop !== selectedCrop)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      // Combine selected crop with 3 random others
      const cropsToPredict = [selectedCrop, ...otherCrops];
      
      console.log('Predicting for crops:', cropsToPredict);
      
      // Make predictions for all 4 crops
      for (const crop of cropsToPredict) {
        const requestBody = {
          year: currentYear,
          average_rain_fall_mm_per_year: parseFloat(data.rainfall),
          pesticides_tonnes: parseFloat(data.pesticides),
          avg_temp: parseFloat(data.temperature),
          area: data.country,
          item: crop,
        };
        
        console.log(`Fetching prediction for crop ${crop}:`, requestBody);
        
        const response = await fetch('http://localhost:5001/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        console.log(`Response status for crop ${crop}:`, response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error response for crop ${crop}:`, errorText);
          throw new Error(`Failed to get prediction for crop ${crop}: ${response.status}`);
        }

        const result: PredictionResult = await response.json();
        console.log(`Prediction result for crop ${crop}:`, result);
        console.log(`Extracted prediction value:`, result.prediction);
        console.log(`Type of prediction:`, typeof result.prediction);
        
        predictions.push({
          crop: crop,
          yield: result.prediction,
        });
      }

      console.log('All predictions:', predictions);
      console.log('First prediction object:', predictions[0]);
      console.log('First prediction yield:', predictions[0].yield);

      // Set the selected crop prediction (first in the array)
      const selectedCropPrediction = predictions[0].yield;
      console.log('Selected crop prediction (final):', selectedCropPrediction);
      console.log('Type of selectedCropPrediction:', typeof selectedCropPrediction);
      
      setPredictedYield(selectedCropPrediction);
      setTrendData(predictions);
      
      toast.success("Yield prediction calculated successfully!", {
        description: `Predicted yield for ${selectedCrop}: ${selectedCropPrediction.toFixed(2)} tonnes/ha`,
      });

      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error("Failed to get prediction", {
        description: error instanceof Error ? error.message : "Please check if the backend server is running on port 5001",
      });
    } finally {
      setIsLoading(false);
    }
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
          <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
        </section>

        {/* Results Display */}
        {predictedYield !== null && (
          <section id="results" className="pt-12">
            <ResultsDisplay predictedYield={predictedYield} trendData={trendData} />
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
