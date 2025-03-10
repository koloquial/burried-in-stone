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

        let user = await User.findOne({ uid });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Clear all saved characters
        user.saved = [];
        await user.save();

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error resetting account:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
