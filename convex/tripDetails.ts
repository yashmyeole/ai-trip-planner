import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateTripDetails = mutation({
    args: { tripId: v.string(), uid: v.id('UserTable'), tripDetail: v.any() },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert("TripDetailsTable",{
            tripId: args.tripId,
            userId: args.uid,
            tripDetail: args.tripDetail,
        })
       
        // If for some reason the fetch fails, fall back to returning the id
        
    }
})