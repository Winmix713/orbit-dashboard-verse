
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignUp as ClerkSignUp, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SignUp = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  
  // If already signed in, redirect to dashboard
  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);
  
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-muted/40">
      <div className="mx-auto flex w-full flex-col items-center">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="absolute left-4 top-4 md:left-8 md:top-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="mx-auto grid w-full max-w-md gap-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          
          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <ClerkSignUp
              signInUrl="/sign-in"
              redirectUrl="/dashboard"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "border-none shadow-none p-0 w-full mx-0",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "w-full",
                  formButtonPrimary: 
                    "bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                  footerAction: 
                    "text-sm text-muted-foreground hover:text-foreground",
                  formFieldLabel: 
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  formFieldInput: 
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  identityPreviewEditButton: 
                    "text-primary underline-offset-4 hover:underline text-sm",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
