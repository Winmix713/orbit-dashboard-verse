
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    score: v.number(),
    previousRank: v.optional(v.number()),
    currentRank: v.optional(v.number()),
    joinedAt: v.string(),
  }).index("by_clerk_id", ["clerkId"]),
  
  organizations: defineTable({
    name: v.string(),
    clerkId: v.string(),
    ownerId: v.string(),
    createdAt: v.string(),
  }).index("by_clerk_id", ["clerkId"]),
  
  boards: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    organizationId: v.string(),
    createdBy: v.string(),
    createdAt: v.string(),
  }).index("by_organization", ["organizationId"]),
  
  activities: defineTable({
    userId: v.string(),
    organizationId: v.string(),
    type: v.string(), // "join", "create_board", "comment", etc.
    resourceId: v.optional(v.string()), // ID of the board, comment, etc.
    detail: v.optional(v.string()),
    timestamp: v.string(),
  }).index("by_organization", ["organizationId"]),
});
