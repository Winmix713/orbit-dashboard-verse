
// Type definitions for our functions
type Context = {
  db: {
    query: (table: string) => any;
    insert: (table: string, data: any) => Promise<any>;
    patch: (id: any, data: any) => Promise<any>;
  };
};

// Create a new organization
export const create = async (
  ctx: Context,
  args: { clerkId: string; name: string; ownerId: string }
) => {
  const { clerkId, name, ownerId } = args;
  
  // Check if organization already exists
  const existingOrg = await ctx.db
    .query("organizations")
    .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", clerkId))
    .first();
  
  if (existingOrg) {
    return existingOrg;
  }
  
  // Create a new organization
  return await ctx.db.insert("organizations", {
    clerkId,
    name,
    ownerId,
    createdAt: new Date().toISOString(),
  });
};

// Get an organization by Clerk ID
export const getByClerkId = async (
  ctx: Context,
  args: { clerkId: string }
) => {
  return await ctx.db
    .query("organizations")
    .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", args.clerkId))
    .first();
};

// List all boards for an organization
export const listBoards = async (
  ctx: Context,
  args: { organizationId: string }
) => {
  return await ctx.db
    .query("boards")
    .withIndex("by_organization", (q: any) => q.eq("organizationId", args.organizationId))
    .collect();
};

// Create a new board for an organization
export const createBoard = async (
  ctx: Context,
  args: { 
    name: string;
    description?: string;
    organizationId: string;
    createdBy: string;
  }
) => {
  const { name, description, organizationId, createdBy } = args;
  
  const boardId = await ctx.db.insert("boards", {
    name,
    description,
    organizationId,
    createdBy,
    createdAt: new Date().toISOString(),
  });
  
  // Create an activity record
  await ctx.db.insert("activities", {
    userId: createdBy,
    organizationId,
    type: "create_board",
    resourceId: boardId,
    detail: `Created board "${name}"`,
    timestamp: new Date().toISOString(),
  });
  
  return boardId;
};

// Get recent activities for an organization
export const getRecentActivities = async (
  ctx: Context,
  args: { organizationId: string; limit?: number }
) => {
  const { organizationId, limit = 10 } = args;
  
  // Get activities for the organization, sorted by most recent
  const activities = await ctx.db
    .query("activities")
    .withIndex("by_organization", (q: any) => q.eq("organizationId", organizationId))
    .collect();
  
  // Sort by timestamp (descending) and limit
  return activities
    .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};
