
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Prediction } from "@/lib/types";

type PredictionButtonsProps = {
  homeTeamName?: string;
  awayTeamName?: string;
  selectedPrediction: string | null;
  existingPrediction?: Prediction;
  onSelectPrediction: (prediction: string) => void;
}

const PredictionButtons = ({
  homeTeamName = "Home",
  awayTeamName = "Away",
  selectedPrediction,
  existingPrediction,
  onSelectPrediction,
}: PredictionButtonsProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-3">
      <button
        className={cn(
          "py-2 px-3 rounded-lg text-sm font-medium transition-all",
          existingPrediction?.prediction === "home"
            ? "bg-blue-500 text-white"
            : selectedPrediction === "home"
              ? "bg-blue-500 text-white"
              : "bg-white/5 text-white hover:bg-white/10",
        )}
        onClick={() => !existingPrediction && onSelectPrediction("home")}
        disabled={!!existingPrediction}
      >
        {homeTeamName} Win
        {existingPrediction?.prediction === "home" && <Check className="w-3 h-3 text-white inline-block ml-1" />}
      </button>
      <button
        className={cn(
          "py-2 px-3 rounded-lg text-sm font-medium transition-all",
          existingPrediction?.prediction === "draw"
            ? "bg-blue-500 text-white"
            : selectedPrediction === "draw"
              ? "bg-blue-500 text-white"
              : "bg-white/5 text-white hover:bg-white/10",
        )}
        onClick={() => !existingPrediction && onSelectPrediction("draw")}
        disabled={!!existingPrediction}
      >
        Draw
        {existingPrediction?.prediction === "draw" && <Check className="w-3 h-3 text-white inline-block ml-1" />}
      </button>
      <button
        className={cn(
          "py-2 px-3 rounded-lg text-sm font-medium transition-all",
          existingPrediction?.prediction === "away"
            ? "bg-blue-500 text-white"
            : selectedPrediction === "away"
              ? "bg-blue-500 text-white"
              : "bg-white/5 text-white hover:bg-white/10",
        )}
        onClick={() => !existingPrediction && onSelectPrediction("away")}
        disabled={!!existingPrediction}
      >
        {awayTeamName} Win
        {existingPrediction?.prediction === "away" && <Check className="w-3 h-3 text-white inline-block ml-1" />}
      </button>
    </div>
  );
};

export default PredictionButtons;
