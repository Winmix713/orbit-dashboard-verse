
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, UserPlus, Radar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  
  // For debugging
  console.log("Index component rendered, isSignedIn:", isSignedIn);
  
  // If signed in, redirect to dashboard
  useEffect(() => {
    if (isSignedIn) {
      console.log("User is signed in, redirecting to dashboard");
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);
  
  const features = [
    {
      icon: BarChart3,
      title: "Comprehensive Dashboard",
      description: "Get a complete overview of your organization's performance with our intuitive dashboard."
    },
    {
      icon: UserPlus,
      title: "Team Management",
      description: "Easily manage your team members and track their contributions to your organization."
    },
    {
      icon: Radar,
      title: "Real-time Leaderboard",
      description: "Track performance rankings across your organization with our dynamic leaderboard."
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Next-Gen Dashboard & Leaderboard
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Powerful analytics, team management, and performance tracking in one unified platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <SignedOut>
                  <Button asChild size="lg">
                    <Link to="/sign-up">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/sign-in">Sign In</Link>
                  </Button>
                </SignedOut>
                <SignedIn>
                  <Button asChild size="lg">
                    <Link to="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </SignedIn>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/placeholder.svg"
                alt="Dashboard Preview"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                width={550}
                height={310}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Powerful Features for Your Organization
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to manage your team and track performance in one place.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8">
            {features.map((feature, i) => (
              <Card key={i} className="transition-all hover:shadow-md">
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Boost Your Organization?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of teams already using our platform to improve performance.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <SignedOut>
                <Button asChild size="lg">
                  <Link to="/sign-up">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button asChild size="lg">
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
