import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateTripDetails = mutation({
  args: { tripId: v.string(), uid: v.id("UserTable"), tripDetail: v.any() },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("TripDetailsTable", {
      tripId: args.tripId,
      userId: args.uid,
      tripDetail: args.tripDetail,
    });

    // If for some reason the fetch fails, fall back to returning the id
  },
});

export const GetUserTripDetails = query({
  args: { uid: v.id("UserTable") },
  handler: async (ctx, args) => {
    const tripDetails = await ctx.db
      .query("TripDetailsTable")
      .filter((q) => q.eq(q.field("userId"), args.uid))
      .order("desc")
      .collect();
    return tripDetails;
  },
});

export const DeleteUserTrip = mutation({
  args: { tripDocId: v.id("TripDetailsTable"), uid: v.id("UserTable") },
  handler: async (ctx, args) => {
    const trip = await ctx.db.get(args.tripDocId);
    if (!trip) {
      throw new Error("Trip not found");
    }

    if (trip.userId !== args.uid) {
      throw new Error("Unauthorized delete request");
    }

    await ctx.db.delete(args.tripDocId);
    return { success: true };
  },
});
