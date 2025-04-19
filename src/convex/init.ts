
// Type definitions for our functions
type Context = {
  db: {
    query: (table: string) => any;
    insert: (table: string, data: any) => Promise<any>;
    patch: (id: any, data: any) => Promise<any>;
  };
};

// Initialize sample data for demo purposes
export const initializeSampleData = async (
  ctx: Context,
  args: { clerkId: string; organizationId: string }
) => {
  const { clerkId, organizationId } = args;
  
  // Check if we already have sample data for this organization
  const existingBoards = await ctx.db
    .query("boards")
    .withIndex("by_organization", (q: any) => q.eq("organizationId", organizationId))
    .collect();
  
  if (existingBoards.length > 0) {
    return { success: true, message: "Sample data already exists" };
  }
  
  // Create sample boards
  const boards = [
    { name: "Product Development", description: "Track product features and releases" },
    { name: "Marketing Campaigns", description: "Plan and execute marketing initiatives" },
    { name: "Customer Support", description: "Manage customer issues and feedback" },
  ];
  
  for (const board of boards) {
    await ctx.db.insert("boards", {
      name: board.name,
      description: board.description,
      organizationId,
      createdBy: clerkId,
      createdAt: new Date().toISOString(),
    });
  }
  
  // Create sample activities
  const activities = [
    { type: "join", detail: "User joined the organization" },
    { type: "create_board", detail: "Created board 'Product Development'" },
    { type: "create_board", detail: "Created board 'Marketing Campaigns'" },
    { type: "create_board", detail: "Created board 'Customer Support'" },
  ];
  
  for (const activity of activities) {
    await ctx.db.insert("activities", {
      userId: clerkId,
      organizationId,
      type: activity.type,
      detail: activity.detail,
      timestamp: new Date().toISOString(),
    });
  }
  
  return { success: true, message: "Sample data initialized successfully" };
};

// Initialize sample users for leaderboard demo
export const initializeLeaderboardUsers = async (ctx: Context) => {
  // Check if we already have sample users
  const existingUsers = await ctx.db.query("users").collect();
  
  if (existingUsers.length > 10) {
    return { success: true, message: "Sample users already exist" };
  }
  
  // Sample user data
  const users = [
    { name: "John Doe", email: "john@example.com", score: 9854 },
    { name: "Jane Smith", email: "jane@example.com", score: 9421 },
    { name: "Robert Johnson", email: "robert@example.com", score: 8975 },
    { name: "Emily Davis", email: "emily@example.com", score: 8752 },
    { name: "Michael Wilson", email: "michael@example.com", score: 8435 },
    { name: "Sarah Taylor", email: "sarah@example.com", score: 8102 },
    { name: "David Brown", email: "david@example.com", score: 7845 },
    { name: "Jennifer Martinez", email: "jennifer@example.com", score: 7632 },
    { name: "Christopher Anderson", email: "chris@example.com", score: 7521 },
    { name: "Lisa Thomas", email: "lisa@example.com", score: 7350 },
  ];
  
  // Calculate ranks
  const sortedUsers = [...users].sort((a, b) => b.score - a.score);
  
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const rank = sortedUsers.findIndex(u => u.email === user.email) + 1;
    
    // Random change
    const changeTypes = ["up", "down", "none"];
    const change = changeTypes[Math.floor(Math.random() * changeTypes.length)];
    
    await ctx.db.insert("users", {
      clerkId: `sample-user-${i}`,  // Fake clerk IDs for sample data
      name: user.name,
      email: user.email,
      score: user.score,
      previousRank: change === "up" ? rank + Math.floor(Math.random() * 3) + 1 : 
                    change === "down" ? Math.max(1, rank - Math.floor(Math.random() * 3) - 1) : 
                    rank,
      currentRank: rank,
      joinedAt: new Date().toISOString(),
    });
  }
  
  return { success: true, message: "Sample leaderboard users initialized successfully" };
};
