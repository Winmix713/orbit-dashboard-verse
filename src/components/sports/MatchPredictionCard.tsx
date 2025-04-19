
import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, History } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppStore } from "@/lib/store";
import { fetchMatchAnalysis } from "@/lib/api";
import { MatchAnalysis } from "@/lib/types";

interface MatchPredictionCardProps {
  homeTeamId: string;
  awayTeamId: string;
}

const MatchPredictionCard = ({ homeTeamId, awayTeamId }: MatchPredictionCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState<MatchAnalysis | null>(null);
  const allTeams = useAppStore((state) => state.allTeams);
  const getMatchAnalysis = useAppStore((state) => state.getMatchAnalysis);

  const homeTeam = allTeams.find(team => team.id === homeTeamId);
  const awayTeam = allTeams.find(team => team.id === awayTeamId);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsLoading(true);
      try {
        const data = await getMatchAnalysis(homeTeamId, awayTeamId);
        setAnalysis(data);
      } catch (error) {
        console.error("Error fetching match analysis:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [homeTeamId, awayTeamId, getMatchAnalysis]);

  if (isLoading) {
    return (
      <div className="p-4 bg-white/5 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-blue-400" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="p-4 bg-white/5 rounded-lg">
        <div className="text-center text-sm text-muted-foreground">
          No prediction data available
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white/5 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="w-4 h-4 text-blue-400" />
        <h3 className="text-sm font-medium">Win Probability</h3>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>{homeTeam?.name || "Home"} Win</span>
            <span className="font-medium text-blue-400">{analysis.homeWinProbability}%</span>
          </div>
          <Progress value={analysis.homeWinProbability} className="h-2 bg-white/10" indicatorClassName="bg-blue-400" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Draw</span>
            <span className="font-medium text-yellow-400">{analysis.drawProbability}%</span>
          </div>
          <Progress value={analysis.drawProbability} className="h-2 bg-white/10" indicatorClassName="bg-yellow-400" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>{awayTeam?.name || "Away"} Win</span>
            <span className="font-medium text-green-400">{analysis.awayWinProbability}%</span>
          </div>
          <Progress value={analysis.awayWinProbability} className="h-2 bg-white/10" indicatorClassName="bg-green-400" />
        </div>
      </div>

      {analysis.historicalMatches && analysis.historicalMatches.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <History className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-medium">Recent Matches</h3>
          </div>
          <div className="space-y-1 text-xs">
            {analysis.historicalMatches.map((match, idx) => (
              <div key={idx} className="flex justify-between">
                <span className="text-muted-foreground">{match.date}: {match.homeTeam} vs {match.awayTeam}</span>
                <span>{match.score}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchPredictionCard;
