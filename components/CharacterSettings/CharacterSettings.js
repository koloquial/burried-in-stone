"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

export default function CharacterSettings({ character, onClose }) {
    const { refreshUserData } = useUser();
    const [newName, setNewName] = useState(character.name);
    const [error, setError] = useState("");

    const handleRename = async () => {
        if (!/^[A-Za-z]+$/.test(newName) || newName.length > 15) {
            setError("Name must be only letters and max 15 characters.");
            return;
        }

        try {
            const res = await fetch("/api/update-character", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oldName: character.name, newName }),
            });

            if (!res.ok) throw new Error("Failed to rename character");

            await refreshUserData();
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch("/api/delete-character", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: character.name }),
            });

            if (!res.ok) throw new Error("Failed to delete character");

            await refreshUserData();
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='content-block'>
            <label>Manage Character</label>

            <div className='content-block'>
            <label>Rename:</label>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
            {error && <p className="error">{error}</p>}

            <div className='button-grid'>
                <button onClick={handleRename}>Rename</button>
                <button onClick={handleDelete} style={{ background: "red", color: "white" }}>Delete</button>
            </div>
            </div>
            
        </div>
    );
}
