import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectToDatabase();
        const { uid, email } = await req.json();

        if (!uid || !email) {
            return NextResponse.json({ error: "Missing UID or Email" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ uid });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        // Create a new user entry
        const newUser = new User({ uid, email, saved: [] });
        await newUser.save();

        return NextResponse.json({ success: true, user: newUser }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
