"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function NewCharacter() {
    const { user } = useAuth();
    const { userData, refreshUserData } = useUser(); // Use refreshUserData
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) {
            router.push("/");
        } else {
            setLoading(false);
        }
    }, [user, router]);

    const handleCreateCharacter = async (e) => {
        e.preventDefault();
        setError("");

        if (!/^[A-Za-z]+$/.test(name) || name.length > 15) {
            setError("Character name must be only letters and max 15 characters.");
            return;
        }

        try {
            const res = await fetch("/api/add-character", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: userData?.uid, name }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to create character");

            await refreshUserData(); 
            router.push("/dashboard"); 
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <Loading />;

    return (
        <div>
            <h2>Create a New Character</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleCreateCharacter}>
                <input
                    type="text"
                    placeholder="Character Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Create Character</button>
            </form>
        </div>
    );
}
