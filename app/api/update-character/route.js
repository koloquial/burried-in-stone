import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDatabase();
    const { oldName, newName } = await req.json();

    if (!oldName || !newName) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const user = await User.findOne({ "saved.name": oldName });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.saved.find((char) => char.name === oldName).name = newName;
    await user.save();

    return NextResponse.json({ success: true }, { status: 200 });
}
