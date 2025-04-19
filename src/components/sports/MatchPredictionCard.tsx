
import { useState, useEffect } from "react";
import { CircleCheck, ArrowDown, ArrowUp, BarChartHorizontal, History } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { MatchAnalysis, Team } from "@/lib/types";
import { fetchMatchAnalysis, calculateOdds, formatProbability } from "@/lib/api";

interface MatchPredictionCardProps {
  homeTeam: Team;
  awayTeam: Team;
  onClose: () => void;
}

const MatchPredictionCard = ({ homeTeam, awayTeam, onClose }: MatchPredictionCardProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("prediction");
  const [analysis, setAnalysis] = useState<MatchAnalysis>({
    homeWinProbability: 0,
    drawProbability: 0,
    awayWinProbability: 0,
    homeForm: 0,
    awayForm: 0,
    prediction: {
      home: 0,
      draw: 0,
      away: 0,
      confidence: 0
    }
  });

  useEffect(() => {
    const loadAnalysis = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMatchAnalysis(homeTeam.id, awayTeam.id);
        setAnalysis(data);
      } catch (error) {
        toast({
          title: "Error loading match analysis",
          description: "Could not load the match analysis data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalysis();
  }, [homeTeam.id, awayTeam.id, toast]);

  // Helper function to determine the trend icon
  const getTrendIcon = (value: number) => {
    if (value > 50) return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (value < 50) return <ArrowDown className="h-4 w-4 text-red-500" />;
    return null;
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card border border-border rounded-lg overflow-hidden shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Match Analysis</CardTitle>
        <CardDescription>
          {homeTeam.name} vs {awayTeam.name}
        </CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mx-4">
          <TabsTrigger value="prediction">Prediction</TabsTrigger>
          <TabsTrigger value="history">Match History</TabsTrigger>
        </TabsList>

        <TabsContent value="prediction" className="p-4 pt-2">
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-20 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-20 bg-muted rounded"></div>
            </div>
          ) : (
            <>
              <div className="mb-6 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{homeTeam.name} Win</span>
                  <span className="text-sm text-muted-foreground">
                    {analysis.prediction?.home}% ({calculateOdds(analysis.prediction?.home || 0)})
                  </span>
                </div>
                <Progress value={analysis.prediction?.home} className="h-2 bg-muted" />
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Draw</span>
                  <span className="text-sm text-muted-foreground">
                    {analysis.prediction?.draw}% ({calculateOdds(analysis.prediction?.draw || 0)})
                  </span>
                </div>
                <Progress value={analysis.prediction?.draw} className="h-2 bg-muted" />
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{awayTeam.name} Win</span>
                  <span className="text-sm text-muted-foreground">
                    {analysis.prediction?.away}% ({calculateOdds(analysis.prediction?.away || 0)})
                  </span>
                </div>
                <Progress value={analysis.prediction?.away} className="h-2 bg-muted" />
              </div>

              <div className="bg-muted/30 p-4 rounded-lg mt-6 border border-border">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <BarChartHorizontal className="h-5 w-5 text-primary" />
                    <span className="font-medium">Recommendation</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <span>Confidence: </span>
                    <span className="text-primary">{analysis.prediction?.confidence}%</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center">
                  <CircleCheck className="h-5 w-5 text-primary mr-2" />
                  <span className="font-medium">
                    {analysis.prediction?.recommended === 'home'
                      ? `${homeTeam.name} Win`
                      : analysis.prediction?.recommended === 'away'
                      ? `${awayTeam.name} Win`
                      : 'Draw'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-muted/20 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Home Form</div>
                  <div className="flex items-center">
                    <Progress value={analysis.homeForm} className="h-2 bg-muted flex-1 mr-2" />
                    <span className="text-sm font-medium">{analysis.homeForm}%</span>
                  </div>
                </div>
                <div className="bg-muted/20 p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Away Form</div>
                  <div className="flex items-center">
                    <Progress value={analysis.awayForm} className="h-2 bg-muted flex-1 mr-2" />
                    <span className="text-sm font-medium">{analysis.awayForm}%</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="history" className="p-4 pt-2">
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-40 bg-muted rounded"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <History className="h-4 w-4" />
                <span>Recent matches between these teams</span>
              </div>

              {analysis.historicalMatches && analysis.historicalMatches.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/4">Date</TableHead>
                      <TableHead className="w-1/2">Match</TableHead>
                      <TableHead className="w-1/4 text-right">Result</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analysis.historicalMatches.map((match, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-xs">{match.date}</TableCell>
                        <TableCell className="text-xs">{match.homeTeam} vs {match.awayTeam}</TableCell>
                        <TableCell className="text-xs text-right font-medium">{match.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No historical matches found
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      <CardFooter className="flex justify-between bg-muted/30 px-6 py-4 border-t border-border">
        <button
          onClick={onClose}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Close
        </button>
      </CardFooter>
    </Card>
  );
};

export default MatchPredictionCard;
