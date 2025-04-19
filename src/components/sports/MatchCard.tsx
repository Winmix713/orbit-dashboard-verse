
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Match } from "@/lib/types";
import TeamSelector from "@/components/sports/TeamSelector";
import TeamDisplay from "@/components/sports/TeamDisplay";
import MatchHeader from "@/components/sports/MatchHeader";
import PredictionButtons from "@/components/sports/PredictionButtons";
import PredictionDots from "@/components/sports/PredictionDots";
import SubmitPredictionButton from "@/components/sports/SubmitPredictionButton";
import MatchPredictionCard from "@/components/sports/MatchPredictionCard";

interface MatchCardProps {
  match: Match;
}

const MatchCard = ({ match }: MatchCardProps) => {
  const { toast } = useToast();
  const allTeams = useAppStore((state) => state.allTeams);
  const predictions = useAppStore((state) => state.predictions);
  const addPrediction = useAppStore((state) => state.addPrediction);
  const updateMatch = useAppStore((state) => state.updateMatch);

  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPredictionCard, setShowPredictionCard] = useState(false);

  // Team selection state for customizable matches
  const [isHomeTeamSelectorOpen, setIsHomeTeamSelectorOpen] = useState(false);
  const [isAwayTeamSelectorOpen, setIsAwayTeamSelectorOpen] = useState(false);

  // Check if there's an existing prediction for this match
  const existingPrediction = predictions.find((p) => p.matchId === match.id);

  const handlePrediction = (prediction: string) => {
    setSelectedPrediction(prediction);
  };

  const handleSubmitPrediction = () => {
    if (!selectedPrediction || !match.homeTeam || !match.awayTeam) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      addPrediction({
        matchId: match.id,
        homeTeam: match.homeTeam!,
        awayTeam: match.awayTeam!,
        prediction: selectedPrediction as "home" | "draw" | "away",
      });

      toast({
        title: "Prediction saved!",
        description: `${match.homeTeam!.name} vs ${match.awayTeam!.name}: ${
          selectedPrediction === "home"
            ? "Home win"
            : selectedPrediction === "draw"
              ? "Draw"
              : "Away win"
        }`,
      });

      setIsSubmitting(false);
    }, 1000);
  };

  const handleSelectTeam = (team: any, type: "home" | "away") => {
    if (type === "home") {
      updateMatch(match.id, { homeTeam: team });
      setIsHomeTeamSelectorOpen(false);
    } else {
      updateMatch(match.id, { awayTeam: team });
      setIsAwayTeamSelectorOpen(false);
    }
  };

  const canPredict = !!(match.homeTeam && match.awayTeam);

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-lg">
      <MatchHeader id={match.id} time={match.time} timeGMT={match.timeGMT} startsIn={match.startsIn} league={match.league} />

      <div className="p-6">
        {match.selectableTeams ? (
          <div className="grid grid-cols-5 gap-2 items-center mb-6">
            <div className="col-span-2">
              <TeamSelector
                team={match.homeTeam}
                allTeams={allTeams}
                isOpen={isHomeTeamSelectorOpen}
                onToggle={() => setIsHomeTeamSelectorOpen(!isHomeTeamSelectorOpen)}
                onSelect={(team) => handleSelectTeam(team, "home")}
                type="home"
              />
            </div>

            <div className="col-span-1 flex flex-col items-center justify-center py-4">
              <div className="font-bold text-muted-foreground text-xl relative">VS</div>
              <PredictionDots selectedPrediction={selectedPrediction} onSelectPrediction={handlePrediction} />
            </div>

            <div className="col-span-2">
              <TeamSelector
                team={match.awayTeam}
                allTeams={allTeams}
                isOpen={isAwayTeamSelectorOpen}
                onToggle={() => setIsAwayTeamSelectorOpen(!isAwayTeamSelectorOpen)}
                onSelect={(team) => handleSelectTeam(team, "away")}
                type="away"
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-6">
            {match.homeTeam && match.awayTeam ? (
              <>
                <TeamDisplay team={match.homeTeam} type="home" />

                <div className="font-bold text-muted-foreground text-xl relative">
                  VS
                  <span className="absolute h-px w-10 bg-border top-1/2 -left-12"></span>
                  <span className="absolute h-px w-10 bg-border top-1/2 -right-12"></span>
                </div>

                <TeamDisplay team={match.awayTeam} type="away" />
              </>
            ) : (
              <div className="w-full flex justify-center">
                <div className="font-bold text-muted-foreground text-xl">VS</div>
              </div>
            )}
          </div>
        )}

        {canPredict && (
          <>
            <div className="mb-4">
              <button
                className={cn(
                  "w-full text-center py-2 text-xs font-medium rounded-lg transition-colors",
                  showPredictionCard ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-gray-400 hover:bg-white/10",
                )}
                onClick={() => setShowPredictionCard(!showPredictionCard)}
              >
                {showPredictionCard ? "Hide" : "View Prediction"}
              </button>
            </div>

            {showPredictionCard && (
              <div className="mb-4">
                <MatchPredictionCard 
                  homeTeam={match.homeTeam} 
                  awayTeam={match.awayTeam}
                  onClose={() => setShowPredictionCard(false)}  
                />
              </div>
            )}

            <PredictionButtons
              homeTeamName={match.homeTeam?.name}
              awayTeamName={match.awayTeam?.name}
              selectedPrediction={selectedPrediction}
              existingPrediction={existingPrediction}
              onSelectPrediction={handlePrediction}
            />
          </>
        )}
      </div>

      <SubmitPredictionButton
        canPredict={canPredict}
        selectedPrediction={selectedPrediction}
        existingPrediction={!!existingPrediction}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmitPrediction}
      />
    </div>
  );
};

export default MatchCard;
