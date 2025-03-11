"use client";
import "./styles.css";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { Hero } from "@/classes/Hero";

export default function NewCharacter() {
    const { user } = useAuth();
    const { userData, refreshUserData } = useUser(); 
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
        const newHero = new Hero(name); // Create a new Hero instance

        const res = await fetch("/api/add-character", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid: userData?.uid, hero: newHero }), // Send full hero object
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
        <div className='new-character'>
            <div className='content-block'>
                <label>Create a New Character</label>
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
        </div>
    );
}
