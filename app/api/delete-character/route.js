import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDatabase();
    const { name } = await req.json();

    if (!name) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const user = await User.findOneAndUpdate(
        { "saved.name": name },
        { $pull: { saved: { name } } },
        { new: true }
    );

    if (!user) {
        return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}
