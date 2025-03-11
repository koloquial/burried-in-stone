"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { deleteUser } from "firebase/auth";
import "./styles.css";

export default function Settings() {
    const { user, signOut } = useAuth();
    const { refreshUserData } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!user) {
            router.push("/");
        } else {
            setLoading(false);
        }
    }, [user, router]);

    const handleResetAccount = async () => {
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/reset-account", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: user?.uid }),
            });

            if (!res.ok) throw new Error("Failed to reset account");

            await refreshUserData();
            setSuccess("Account reset successfully! All characters deleted.");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteAccount = async () => {
        if (!confirm("Are you sure? This action is permanent!")) return;

        try {
            // Remove user from MongoDB
            const res = await fetch("/api/delete-account", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: user?.uid }),
            });

            if (!res.ok) throw new Error("Failed to delete account");

            // Remove user from Firebase
            await deleteUser(user);

            // Sign out & Redirect to homepage
            await signOut();
            router.push("/");
        } catch (err) {
            setError("Failed to delete account. Please log in again and try.");
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="settings">
            <div className='content-block'>
                <label>Settings</label>
            </div>

            <div className='content-block'>
    
            
                <label>Reset Account</label>
                <p>This will delete all of your characters.</p>
                <button onClick={handleResetAccount}>Reset</button>
                </div>

            

 
            <div className="content-block">
                <label>Delete Account</label>
                <p>This action is permanent.</p>
                <button onClick={handleDeleteAccount}>Delete Account</button>
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

           
        </div>
    );
}
