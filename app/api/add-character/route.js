import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectToDatabase();
        const { uid, name } = await req.json();

        if (!uid || !name) {
            return NextResponse.json({ error: "Missing UID or Name" }, { status: 400 });
        }

        if (!/^[A-Za-z]+$/.test(name) || name.length > 15) {
            return NextResponse.json({ error: "Invalid name format" }, { status: 400 });
        }

        let user = await User.findOne({ uid });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        user.saved.push({ name });
        await user.save();

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error adding character:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
