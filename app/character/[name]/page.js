"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Loading from "@/components/Loading";
import "./styles.css"

export default function CharacterSettings() {
    const { userData, refreshUserData } = useUser();
    const router = useRouter();
    const { name } = useParams(); // Get character name from URL
    const [character, setCharacter] = useState(null);
    const [newName, setNewName] = useState(name);
    const [error, setError] = useState("");

    // Fetch the character details from saved characters
    useEffect(() => {
        if (userData?.saved) {
            const foundCharacter = userData.saved.find(char => char.name === name);
            if (!foundCharacter) router.push("/dashboard"); // Redirect if character not found
            setCharacter(foundCharacter);
        }
    }, [userData, name, router]);

    const handleRename = async () => {
        if (!/^[A-Za-z]+$/.test(newName) || newName.length > 15) {
            setError("Name must be only letters and max 15 characters.");
            return;
        }

        try {
            const res = await fetch("/api/update-character", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oldName: name, newName }),
            });

            if (!res.ok) throw new Error("Failed to rename character");

            await refreshUserData();
            router.push(`/character/${newName}`); // Update the URL with the new name
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch("/api/delete-character", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });

            if (!res.ok) throw new Error("Failed to delete character");

            await refreshUserData();
            router.push("/dashboard"); // Redirect after deletion
        } catch (err) {
            setError(err.message);
        }
    };

    if (!character) return <Loading />;

    return (
        <div className="view-character">
            <div className="content-block">
                <label>Character Settings</label>
            </div>

            {/* Character Details */}
            <div className="content-block">
                <label>Character Details</label>
                <br />
                <div className='grid-2x'>
                <div>
                <label>HP</label>
                <p>Level {character.health.level}</p>
                <p>{character.health.current} / {character.health.max}</p>
                </div>

                <div>
                <label>MP</label>
                <p>Level {character.mana.level}</p>
                <p>{character.mana.current} / {character.mana.max}</p>
                </div>

                <div>
                <label>Inv</label>
                <p>{character.inventory.length > 0 ? character.inventory.join(", ") : "Empty"}</p>
                </div>

                <div>
                <label>$</label>
                <p>{character.currency}</p>
                </div>

                <div>
                <label>Lockpkg</label>
                <p>Level {character.lockpicking.level}</p>
                <p>XP: {character.lockpicking.xp} / {character.lockpicking.nextXp}</p>
                </div>

                <div>
                <label>Percep</label>
                <p>Level {character.perception.level}</p>
                <p>XP: {character.perception.xp} / {character.perception.nextXp}</p>
                </div>

                <div>
                <label>Honor</label>
                <p>{character.honor}</p>
                </div>
                </div>
            </div>

            {/* Rename Option */}
            <div className="content-block">
                <label>Rename Character</label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                {error && <p className="error">{error}</p>}
                <button onClick={handleRename}>Rename</button>
            </div>

            {/* Delete Button */}
            <div className='content-block'>
            <button onClick={handleDelete} className="delete-button">Delete Character</button>
            </div>
        </div>
    );
}
