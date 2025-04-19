
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

// Layout
import RootLayout from "./components/layout/RootLayout";

const queryClient = new QueryClient();

// Public key would normally come from environment variables
const CLERK_PUBLISHABLE_KEY = "pk_test_example-key";

// Initialize Convex client (URL would come from environment variables)
const convex = new ConvexReactClient("https://example.convex.cloud");

const App = () => (
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <ConvexProvider client={convex}>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                
                {/* Routes with shared layout */}
                <Route element={<RootLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ConvexProvider>
  </ClerkProvider>
);

export default App;
