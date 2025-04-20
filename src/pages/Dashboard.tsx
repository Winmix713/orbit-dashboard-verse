
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent predictions and results</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent activities yet.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>Your prediction accuracy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span>Win rate:</span>
                <span className="font-medium">0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Predictions made:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total points:</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Matches available for predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No upcoming events at the moment.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
