
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  Search,
  Trophy,
} from "lucide-react";

// Define the column types for the leaderboard
export type UserData = {
  id: string;
  rank: number;
  name: string;
  email: string;
  score: number;
  change: "up" | "down" | "none";
  changeAmount: number;
};

// Leaderboard Loading Component
const LeaderboardLoading = () => {
  return (
    <div className="container px-4 py-10 space-y-8">
      <div>
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      
      <div>
        <Skeleton className="h-10 w-full max-w-xs mb-4" />
      </div>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-36 mb-2" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <div className="grid gap-3">
              <Skeleton className="h-12 w-full" />
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Function to render the rank change indicator
const RankChangeIndicator = ({ change, amount }: { change: string; amount: number }) => {
  if (change === "up") {
    return (
      <div className="flex items-center text-emerald-500">
        <ArrowUp className="mr-1 h-4 w-4" />
        <span>{amount}</span>
      </div>
    );
  } else if (change === "down") {
    return (
      <div className="flex items-center text-red-500">
        <ArrowDown className="mr-1 h-4 w-4" />
        <span>{amount}</span>
      </div>
    );
  }
  return <span>-</span>;
};

// Function to get medal for top 3 ranks
const RankDisplay = ({ rank }: { rank: number }) => {
  if (rank === 1) {
    return (
      <div className="flex items-center">
        <Trophy className="h-5 w-5 text-yellow-500 mr-1" />
        <span>1st</span>
      </div>
    );
  } else if (rank === 2) {
    return (
      <div className="flex items-center">
        <Trophy className="h-5 w-5 text-gray-400 mr-1" />
        <span>2nd</span>
      </div>
    );
  } else if (rank === 3) {
    return (
      <div className="flex items-center">
        <Trophy className="h-5 w-5 text-amber-700 mr-1" />
        <span>3rd</span>
      </div>
    );
  }
  return <span>{rank}</span>;
};

// Main Leaderboard Component
const Leaderboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rank");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  
  // Mock leaderboard data - would come from Convex in a real implementation
  const [userData, setUserData] = useState<UserData[]>([
    { id: "1", rank: 1, name: "John Doe", email: "john@example.com", score: 9854, change: "up", changeAmount: 2 },
    { id: "2", rank: 2, name: "Jane Smith", email: "jane@example.com", score: 9421, change: "none", changeAmount: 0 },
    { id: "3", rank: 3, name: "Robert Johnson", email: "robert@example.com", score: 8975, change: "down", changeAmount: 1 },
    { id: "4", rank: 4, name: "Emily Davis", email: "emily@example.com", score: 8752, change: "up", changeAmount: 3 },
    { id: "5", rank: 5, name: "Michael Wilson", email: "michael@example.com", score: 8435, change: "none", changeAmount: 0 },
    { id: "6", rank: 6, name: "Sarah Taylor", email: "sarah@example.com", score: 8102, change: "up", changeAmount: 1 },
    { id: "7", rank: 7, name: "David Brown", email: "david@example.com", score: 7845, change: "down", changeAmount: 2 },
    { id: "8", rank: 8, name: "Jennifer Martinez", email: "jennifer@example.com", score: 7632, change: "up", changeAmount: 4 },
    { id: "9", rank: 9, name: "Christopher Anderson", email: "chris@example.com", score: 7521, change: "down", changeAmount: 1 },
    { id: "10", rank: 10, name: "Lisa Thomas", email: "lisa@example.com", score: 7350, change: "up", changeAmount: 2 },
  ]);
  
  // Check authentication and redirect if needed
  useEffect(() => {
    if (userLoaded && !isSignedIn) {
      navigate("/sign-in");
    }
  }, [userLoaded, isSignedIn, navigate]);
  
  // Simulate loading time
  useEffect(() => {
    if (userLoaded) {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [userLoaded]);
  
  // Handle sorting
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };
  
  // Apply sorting and filtering
  const sortAndFilterData = () => {
    let filteredData = [...userData];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter(
        user => 
          user.name.toLowerCase().includes(query) || 
          user.email.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    filteredData.sort((a, b) => {
      const aValue = a[sortBy as keyof UserData];
      const bValue = b[sortBy as keyof UserData];
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
    
    return filteredData;
  };
  
  const displayData = sortAndFilterData();
  
  const getSortIcon = (column: string) => {
    if (sortBy !== column) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };
  
  if (!userLoaded || isLoading) {
    return <LeaderboardLoading />;
  }
  
  return (
    <div className="container px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Leaderboard</h1>
        <p className="text-muted-foreground">
          Track performance and rankings across your organization.
        </p>
      </div>
      
      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Rankings</CardTitle>
          <CardDescription>
            Updated daily based on user activity and performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="w-[80px] cursor-pointer"
                    onClick={() => handleSort("rank")}
                  >
                    <div className="flex items-center">
                      Rank {getSortIcon("rank")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Name {getSortIcon("name")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("email")}
                  >
                    <div className="flex items-center">
                      Email {getSortIcon("email")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer"
                    onClick={() => handleSort("score")}
                  >
                    <div className="flex items-center justify-end">
                      Score {getSortIcon("score")}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No results found
                    </TableCell>
                  </TableRow>
                ) : (
                  displayData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <RankDisplay rank={user.rank} />
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="text-right">{user.score.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <RankChangeIndicator change={user.change} amount={user.changeAmount} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
