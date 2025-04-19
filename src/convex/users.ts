
import { v } from "convex/values";

// Type definitions for our functions
type Context = {
  db: {
    query: (table: string) => any;
    insert: (table: string, data: any) => Promise<any>;
    patch: (id: any, data: any) => Promise<any>;
  };
};

// Create or update a user
export const createOrUpdate = async (
  ctx: Context,
  args: { clerkId: string; name: string; email: string }
) => {
  const { clerkId, name, email } = args;
  
  // Check if user exists
  const existingUser = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", clerkId))
    .first();
  
  if (existingUser) {
    // Update the user
    return await ctx.db.patch(existingUser._id, {
      name,
      email,
    });
  }
  
  // Create a new user
  return await ctx.db.insert("users", {
    clerkId,
    name,
    email,
    score: 0,
    previousRank: null,
    currentRank: null,
    joinedAt: new Date().toISOString(),
  });
};

// Get a user by Clerk ID
export const getByClerkId = async (
  ctx: Context,
  args: { clerkId: string }
) => {
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", args.clerkId))
    .first();
};

// List all users for the leaderboard
export const list = async (ctx: Context) => {
  const users = await ctx.db.query("users").collect();
  
  // Sort by score and calculate ranks
  const sortedUsers = users
    .sort((a: any, b: any) => b.score - a.score)
    .map((user: any, index: number) => ({
      ...user,
      rank: index + 1,
      change: user.previousRank !== null && user.currentRank !== null 
        ? user.previousRank > user.currentRank 
          ? "up" 
          : user.previousRank < user.currentRank 
            ? "down" 
            : "none"
        : "none",
      changeAmount: user.previousRank !== null && user.currentRank !== null
        ? Math.abs(user.previousRank - user.currentRank)
        : 0,
    }));
  
  return sortedUsers;
};

// Update user score
export const updateScore = async (
  ctx: Context,
  args: { clerkId: string; scoreIncrease: number }
) => {
  const { clerkId, scoreIncrease } = args;
  
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", clerkId))
    .first();
  
  if (!user) {
    throw new Error("User not found");
  }
  
  // Store previous rank before updating
  const allUsers = await ctx.db.query("users").collect();
  const sortedUsers = allUsers.sort((a: any, b: any) => b.score - a.score);
  const previousRank = sortedUsers.findIndex((u: any) => u._id === user._id) + 1;
  
  // Update score
  const newScore = user.score + scoreIncrease;
  
  return await ctx.db.patch(user._id, {
    score: newScore,
    previousRank: user.currentRank || previousRank,
    currentRank: previousRank,
  });
};
