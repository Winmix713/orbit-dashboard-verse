
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const LeaderboardPage = () => {
  // Sample leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Alex Johnson", score: 1250, change: "up", avatar: "" },
    { rank: 2, name: "Sam Smith", score: 1120, change: "down", avatar: "" },
    { rank: 3, name: "Jordan Lee", score: 980, change: "up", avatar: "" },
    { rank: 4, name: "Taylor Swift", score: 920, change: "same", avatar: "" },
    { rank: 5, name: "Morgan Chen", score: 840, change: "up", avatar: "" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Predictors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right w-[100px]">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user) => (
                <TableRow key={user.rank}>
                  <TableCell className="font-medium">{user.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{user.score}</TableCell>
                  <TableCell className="text-right">
                    {user.change === "up" && (
                      <Badge variant="default" className="bg-green-500">↑</Badge>
                    )}
                    {user.change === "down" && (
                      <Badge variant="destructive">↓</Badge>
                    )}
                    {user.change === "same" && (
                      <Badge variant="secondary">−</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>The leaderboard is updated daily. Keep making accurate predictions to climb the ranks!</p>
      </div>
    </div>
  );
};

export default LeaderboardPage;
