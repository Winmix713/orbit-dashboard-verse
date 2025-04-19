
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useOrganization } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PlusIcon, Users, BarChart3, ArrowUpRight, Clock } from "lucide-react";

// Empty org component when no organization exists
const EmptyOrg = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCreateOrg = () => {
    setIsLoading(true);
    // This would normally open Clerk's create org UI
    // For now we just simulate loading
    setTimeout(() => setIsLoading(false), 1500);
  };
  
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Create an Organization
          </CardTitle>
          <CardDescription>
            You need to create or join an organization to access the dashboard features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Organizations allow you to collaborate with team members and track performance together.
          </p>
          <Button 
            onClick={handleCreateOrg} 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>Creating...</>
            ) : (
              <>
                <PlusIcon className="h-4 w-4" />
                Create Organization
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// Board list component when organization exists
const BoardList = () => {
  // Sample data - would come from Convex in a real implementation
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 700 },
  ];
  
  const stats = [
    { title: "Total Users", value: "2,345", icon: Users, change: "+12.5%" },
    { title: "Active Boards", value: "12", icon: BarChart3, change: "+3.2%" },
    { title: "Avg. Session", value: "24m", icon: Clock, change: "+5.1%" },
  ];
  
  return (
    <div className="grid gap-6">
      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
          <CardDescription>
            User activity over the past 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest actions from your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">User joined team</p>
                  <p className="text-xs text-muted-foreground">John Doe joined Marketing team</p>
                </div>
                <div className="text-xs text-muted-foreground">2h ago</div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View all activity</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Dashboard loading state
const DashboardLoading = () => {
  return (
    <div className="container px-4 py-10 space-y-8">
      <div>
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-36 mb-2" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  const { isLoaded: orgLoaded, organization } = useOrganization();
  const navigate = useNavigate();
  
  // Check authentication and redirect if needed
  useEffect(() => {
    if (userLoaded && !isSignedIn) {
      navigate("/sign-in");
    }
  }, [userLoaded, isSignedIn, navigate]);
  
  // Simulate loading time
  useEffect(() => {
    if (userLoaded && orgLoaded) {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [userLoaded, orgLoaded]);
  
  if (!userLoaded || isLoading) {
    return <DashboardLoading />;
  }
  
  return (
    <div className="container px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Dashboard</h1>
        <p className="text-muted-foreground">
          {organization ? `Welcome to ${organization.name}'s dashboard` : 'Create an organization to get started'}
        </p>
      </div>
      
      {organization ? <BoardList /> : <EmptyOrg />}
    </div>
  );
};

export default Dashboard;
