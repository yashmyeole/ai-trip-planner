import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { image } from "motion/react-client";

export default defineSchema({
  UserTable: defineTable({
    name: v.string(),
    imageUrl: v.string(),
    email : v.string(),
    subscription : v.optional(v.string())
  }),
});