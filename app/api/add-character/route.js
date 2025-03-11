import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectToDatabase();
        const { uid, hero } = await req.json();

        if (!uid || !hero) {
            return NextResponse.json({ error: "Missing UID or Hero data" }, { status: 400 });
        }

        let user = await User.findOne({ uid });

        // Ensure hero is converted to a plain JavaScript object
        const heroObject = JSON.parse(JSON.stringify(hero));

        if (user) {
            console.log('HERO (Before Saving):', heroObject); // Check if full object is here
            user.saved.push(heroObject); // Push as a plain object
            await user.save();
            console.log('UPDATED USER:', user); // Log updated user to confirm
        } else {
            user = await User.create({ uid, saved: [heroObject] });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error in add-character API:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
