import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectToDatabase();
        const { uid } = await req.json();

        if (!uid) {
            return NextResponse.json({ error: "Missing UID" }, { status: 400 });
        }

        // Fetch user from MongoDB
        const user = await User.findOne({ uid });

        // If user is not found, return 404 (Handled in `UserContext.js`)
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return user data
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error in fetching user data:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
