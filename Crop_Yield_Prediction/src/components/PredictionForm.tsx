import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sprout } from "lucide-react";

const countries = [
  "Algeria", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", 
  "Bahamas", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Botswana", "Brazil", 
  "Bulgaria", "Burkina Faso", "Burundi", "Cameroon", "Canada", "Central African Republic", 
  "Chile", "Colombia", "Croatia", "Denmark", "Dominican Republic", "Ecuador", "Egypt", 
  "El Salvador", "Eritrea", "Estonia", "Finland", "France", "Germany", "Ghana", 
  "Greece", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "India", 
  "Indonesia", "Iraq", "Ireland", "Italy", "Jamaica", "Japan", "Kazakhstan", "Kenya", 
  "Latvia", "Lebanon", "Lesotho", "Libya", "Lithuania", "Madagascar", "Malawi", 
  "Malaysia", "Mali", "Mauritania", "Mauritius", "Mexico", "Montenegro", "Morocco", 
  "Mozambique", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", 
  "Norway", "Pakistan", "Papua New Guinea", "Peru", "Poland", "Portugal", "Qatar", 
  "Romania", "Rwanda", "Saudi Arabia", "Senegal", "Slovenia", "South Africa", "Spain", 
  "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Tajikistan", "Thailand", 
  "Tunisia", "Turkey", "Uganda", "Ukraine", "United Kingdom", "Uruguay", "Zambia", "Zimbabwe"
];

const crops = [
  "Maize", "Plantains and others", "Potatoes", "Rice, paddy", "Sorghum", 
  "Soybeans", "Sweet potatoes", "Wheat", "Yams"
];

interface PredictionFormProps {
  onPredict: (data: FormData) => void;
}

export interface FormData {
  year: string;
  rainfall: string;
  pesticides: string;
  temperature: string;
  country: string;
  crop: string;
}

const PredictionForm = ({ onPredict }: PredictionFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    year: "",
    rainfall: "",
    pesticides: "",
    temperature: "",
    country: "",
    crop: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-8 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Sprout className="text-accent animate-float" size={32} />
        <h2 className="text-2xl font-bold text-foreground">Crop Prediction Parameters</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="year" className="text-foreground font-medium">
            Year
          </Label>
          <Input
            id="year"
            type="number"
            placeholder="e.g., 2024"
            value={formData.year}
            onChange={(e) => handleInputChange("year", e.target.value)}
            className="bg-background/50 border-border/50 focus:border-accent focus:ring-accent"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rainfall" className="text-foreground font-medium">
            Average Rainfall (mm/year)
          </Label>
          <Input
            id="rainfall"
            type="number"
            step="0.01"
            placeholder="e.g., 1200.5"
            value={formData.rainfall}
            onChange={(e) => handleInputChange("rainfall", e.target.value)}
            className="bg-background/50 border-border/50 focus:border-accent focus:ring-accent"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pesticides" className="text-foreground font-medium">
            Pesticides Used (tonnes)
          </Label>
          <Input
            id="pesticides"
            type="number"
            step="0.01"
            placeholder="e.g., 15.75"
            value={formData.pesticides}
            onChange={(e) => handleInputChange("pesticides", e.target.value)}
            className="bg-background/50 border-border/50 focus:border-accent focus:ring-accent"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="temperature" className="text-foreground font-medium">
            Average Temperature (°C)
          </Label>
          <Input
            id="temperature"
            type="number"
            step="0.1"
            placeholder="e.g., 25.3"
            value={formData.temperature}
            onChange={(e) => handleInputChange("temperature", e.target.value)}
            className="bg-background/50 border-border/50 focus:border-accent focus:ring-accent"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className="text-foreground font-medium">
            Select Country
          </Label>
          <Select
            value={formData.country}
            onValueChange={(value) => handleInputChange("country", value)}
            required
          >
            <SelectTrigger 
              id="country"
              className="bg-background/50 border-border/50 focus:border-accent focus:ring-accent"
            >
              <SelectValue placeholder="Choose a country" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] bg-card/95 backdrop-blur-xl border-border">
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="crop" className="text-foreground font-medium">
            Select Crop Type
          </Label>
          <Select
            value={formData.crop}
            onValueChange={(value) => handleInputChange("crop", value)}
            required
          >
            <SelectTrigger 
              id="crop"
              className="bg-background/50 border-border/50 focus:border-accent focus:ring-accent"
            >
              <SelectValue placeholder="Choose a crop" />
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-xl border-border">
              {crops.map((crop) => (
                <SelectItem key={crop} value={crop}>
                  {crop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-2xl font-semibold glow-accent transition-all duration-300 hover:scale-[1.02]"
      >
        Predict Yield
      </Button>
    </form>
  );
};

export default PredictionForm;
