import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
    args: { name: v.string(), imageUrl: v.string(), email: v.string() },
    handler: async (ctx, { name, imageUrl, email }) => {
        const user = await ctx.db.query("UserTable").filter((q) => q.eq(q.field("email"), email)).first();
        if (user) {
            return user._id;
        }
        const id = await ctx.db.insert("UserTable", {
            name,
            imageUrl,
            email,
        });
        return id;
    }
})