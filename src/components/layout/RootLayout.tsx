
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, LayoutDashboard, Trophy, Menu, X } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <LayoutDashboard className="h-5 w-5" />
            <span>DashLeader</span>
          </Link>
        </div>
        
        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-6">
          <SignedIn>
            <Link to="/dashboard" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'}`}>
              Dashboard
            </Link>
            <Link to="/leaderboard" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/leaderboard') ? 'text-primary' : 'text-muted-foreground'}`}>
              Leaderboard
            </Link>
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}>
              Sports
            </Link>
          </SignedIn>
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-md p-2.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button asChild variant="default">
              <Link to="/sign-in">Sign In</Link>
            </Button>
          </SignedOut>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden p-4 pt-2 pb-4 border-b border-border/40 bg-background">
          <nav className="flex flex-col gap-4">
            <SignedIn>
              <Link 
                to="/dashboard" 
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={closeMenu}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link 
                to="/leaderboard" 
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${isActive('/leaderboard') ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={closeMenu}
              >
                <Trophy className="h-4 w-4" />
                Leaderboard
              </Link>
              <Link 
                to="/" 
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={closeMenu}
              >
                <Trophy className="h-4 w-4" />
                Sports
              </Link>
            </SignedIn>
            <SignedOut>
              <Button asChild variant="default" onClick={closeMenu}>
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </SignedOut>
          </nav>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="py-6 md:py-0 border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} DashLeader. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      <Sonner />
    </div>
  );
};

export default RootLayout;
