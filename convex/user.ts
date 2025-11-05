import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
    args: { name: v.string(), imageUrl: v.string(), email: v.string() },
    handler: async (ctx, { name, imageUrl, email }) => {
        const user = await ctx.db.query("UserTable").filter((q) => q.eq(q.field("email"), email)).first();
        if (user) {
            return user; // return full existing user object
        }
        const id = await ctx.db.insert("UserTable", {
            name,
            imageUrl,
            email,
        });
        const newUser = await ctx.db.get(id);
        // If for some reason the fetch fails, fall back to returning the id
        return newUser ?? id;
    }
})