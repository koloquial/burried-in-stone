"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext"; // Import User Context
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { useSocket } from "@/context/SocketContext";

export default function Game() {
    const { user } = useAuth();
    const { activeCharacter } = useUser(); // Get active character from context
    const router = useRouter();
    const socket = useSocket();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push("/"); // Redirect to home if not logged in
        } else if (!activeCharacter) {
            router.push("/dashboard"); // Redirect to dashboard if no active character
        } else {
            setLoading(false); // Allow game to load
        }
    }, [user, activeCharacter, router]);

    if (loading) return <Loading />;

    return (
        <div className="game">
            {/* Game content here */}
            {console.log('Active:', activeCharacter)}
        </div>
    );
}
