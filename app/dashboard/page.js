"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { useSocket } from "@/context/SocketContext";
import Popup from "@/components/Popup";
import CharacterSettings from "@/components/CharacterSettings";

export default function Dashboard() {
    const { user, signOut } = useAuth();
    const { userData, loading: userLoading } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const socket = useSocket();
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push("/");
        } else {
            setLoading(false);
        }
    }, [user, router]);

    if (loading || userLoading) return <Loading />;

    const hasReachedCharacterLimit = userData?.saved?.length >= 3; // Check if the user has 3 characters

    return (
        <div>
            <h1>Welcome, {user?.email}!</h1>

            {/* Create Character Button (Only visible if less than 3 characters) */}
            {!hasReachedCharacterLimit && (
                <button onClick={() => router.push("/new-character")}>Create Character</button>
            )}

            {/* Display Saved Characters */}
            <h2>Load Game</h2>
            <div className="character-grid">
                {userData?.saved && userData.saved.length > 0 ? (
                    userData.saved.map((char, index) => (
                        <div key={index} className="character-tile">
                            <h3>{char.name}</h3>
                            <button onClick={() => router.push("/game")}>Continue</button>
                            <button className="settings-btn" onClick={() => {
                                setSelectedCharacter(char);
                                setIsPopupOpen(true);
                            }}>
                                ⚙️
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No characters created yet.</p>
                )}
            </div>

            {/* Reusable Popup with CharacterSettings inside */}
            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                {selectedCharacter && <CharacterSettings character={selectedCharacter} onClose={() => setIsPopupOpen(false)} />}
            </Popup>
        </div>
    );
}
