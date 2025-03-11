"use client";
import "./styles.css";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useSocket } from "@/context/SocketContext";

// Components
import Loading from "@/components/Loading";

// Icons
import { FaCog } from "react-icons/fa";

export default function Dashboard() {
    const router = useRouter();
    const socket = useSocket();
    const { user, signOut } = useAuth();
    const { userData, loading: userLoading, setActiveCharacter } = useUser();
    const [loading, setLoading] = useState(true);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    useEffect(() => {
        if (!user) {
            router.push("/");
        } else {
            setLoading(false);
        }
    }, [user, router]);

    if (loading || userLoading) return <Loading />;

    // Check if the user has 3 characters
    const hasReachedCharacterLimit = userData?.saved?.length >= 3; 

    return (
        <div className='dashboard'>
            {console.log('Auth:', user)}
            {console.log('Mongo:', userData)}
            <div className='content-block'>
                <label>Burried in Stone</label>
                
                {/* Create Character Button (Only visible if less than 3 characters) */}
                {!hasReachedCharacterLimit && (
                    <button onClick={() => router.push("/new-character")}>+ New Character</button>
                )}
            </div>

            <div className='content-block'>
                {/* Display Saved Characters */}
                <label>Load Game</label>
                <div className="character-grid">
    {userData?.saved && userData.saved.length > 0 ? (
        userData.saved.map((char, index) => (
            <div 
                key={index} 
                className="character-tile" 
                onClick={() => {
                    setActiveCharacter(char); 
                    router.push("/game");
                }}>
                
                {/* Settings Icon */}
                <button 
                    className="settings-btn" 
                    onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering character tile click
                        router.push(`/character/${char.name}`); // Redirect to character settings page
                    }}
                >
                    <FaCog className="nav-icon" />
                </button>

                {/* Character Name */}
                <label>{char.name}</label>
            </div>
        ))
    ) : ( 
        <p>No characters created yet.</p> 
    )}
</div>


            </div>

           
        </div>
    );
}
