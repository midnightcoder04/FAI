import { TrendingUp, BarChart3 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ResultsDisplayProps {
  predictedYield: number;
}

const ResultsDisplay = ({ predictedYield }: ResultsDisplayProps) => {
  // Mock historical data for trend visualization
  const trendData = [
    { year: "2020", yield: predictedYield * 0.85 },
    { year: "2021", yield: predictedYield * 0.92 },
    { year: "2022", yield: predictedYield * 0.88 },
    { year: "2023", yield: predictedYield * 0.95 },
    { year: "2024", yield: predictedYield },
  ];

  return (
    <div className="glass-strong rounded-3xl p-8 max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="text-accent" size={32} />
        <h2 className="text-2xl font-bold text-foreground">Prediction Results</h2>
      </div>

      <div className="glass rounded-2xl p-8 text-center space-y-2 glow-accent">
        <p className="text-muted-foreground text-sm uppercase tracking-wider">
          Predicted Crop Yield
        </p>
        <p className="text-5xl font-bold text-accent">
          {predictedYield.toFixed(2)}
        </p>
        <p className="text-muted-foreground text-lg">tonnes/hectare</p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-secondary" size={24} />
          <h3 className="text-lg font-semibold text-foreground">Yield Trend Analysis</h3>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="year" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                backdropFilter: "blur(20px)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Line
              type="monotone"
              dataKey="yield"
              stroke="hsl(var(--accent))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--accent))", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="pt-4 border-t border-border/30">
          <p className="text-sm text-muted-foreground text-center">
            Historical trend showing steady growth in yield potential
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
