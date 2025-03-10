"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { useSocket } from "@/context/SocketContext";

export default function Game() {
    const { user } = useAuth();
    const router = useRouter();
    const socket = useSocket();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push("/");
        } else {
            setLoading(false);
        }
    }, [user, router]);

    if (loading) return <Loading />;

    return (
        <div className="game-container">
            <h1>Game Page</h1>
            <p>Welcome, {user?.email}! The game is under development.</p>

            
        </div>
    );
}
