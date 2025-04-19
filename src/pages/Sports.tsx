
import { useState, useEffect } from "react";
import { Trophy, Bell, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

// Import store for user stats
import { useAppStore } from "@/lib/store";

// Import components
import UserStats from "@/components/sports/UserStats";
import MatchCard from "@/components/sports/MatchCard";
import MatchCardSkeleton from "@/components/sports/MatchCardSkeleton";
import NotificationCenter from "@/components/sports/NotificationCenter";
import MatchFilters from "@/components/sports/MatchFilters";
import ActionsDropdown from "@/components/sports/ActionsDropdown";

const SportsPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Get matches from the store
  const matches = useAppStore((state) => state.matches);

  useEffect(() => {
    setShowAnimation(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/15 via-green-500/5 to-transparent z-0 pointer-events-none"></div>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <section className="mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3">
            Sports <span className="text-primary">Predictions</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Test your sports knowledge, make predictions, and compete for the best rankings.
          </p>
        </section>

        <section className="mb-10">
          <UserStats />
        </section>

        <section className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Trophy className="h-4 w-4" />
              Export
            </Button>
            <NotificationCenter />
          </div>
          <ActionsDropdown />
        </section>

        <section className="mb-8">
          <MatchFilters
            onChange={(filters) => {
              console.log("Filters changed:", filters);
            }}
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <MatchCardSkeleton key={`skeleton-${index}`} />
                ))
            : matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
        </section>
      </main>
    </div>
  );
};

export default SportsPage;
