import { TrendingUp, BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrendDataPoint {
  crop: string;
  yield: number;
}

interface ResultsDisplayProps {
  predictedYield: number;
  trendData: TrendDataPoint[];
}

const ResultsDisplay = ({ predictedYield, trendData }: ResultsDisplayProps) => {
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
          <h3 className="text-lg font-semibold text-foreground">Crop Yield Comparison</h3>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="crop" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '11px' }}
              angle={-15}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
              label={{ 
                value: 'Yield (tonnes/ha)', 
                angle: -90, 
                position: 'insideLeft',
                style: { fontSize: '12px', fill: 'hsl(var(--muted-foreground))' }
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                backdropFilter: "blur(20px)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number) => [`${value.toFixed(2)} tonnes/ha`, 'Yield']}
            />
            <Bar
              dataKey="yield"
              fill="hsl(var(--accent))"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

        <div className="pt-4 border-t border-border/30">
          <p className="text-sm text-muted-foreground text-center">
            Comparing selected crop yield with 3 other randomly chosen crop types for the same conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
