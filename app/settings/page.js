"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { deleteUser } from "firebase/auth";

export default function Settings() {
    const { user, signOut } = useAuth();
    const { refreshUserData } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!user) {
            router.push("/");
        } else {
            setLoading(false);
            setDarkMode(localStorage.getItem("theme") === "dark");
        }
    }, [user, router]);

    const toggleDarkMode = () => {
        const newTheme = darkMode ? "light" : "dark";
        setDarkMode(!darkMode);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

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
        <div className="settings-container">
            <h1>Settings</h1>

            {/* Dark Mode Toggle */}
            <div className="setting-item">
                <label>Dark Mode:</label>
                <button onClick={toggleDarkMode}>{darkMode ? "Disable" : "Enable"}</button>
            </div>

            {/* Reset Account (Delete All Characters) */}
            <div className="setting-item">
                <label>Reset Account (Delete All Characters):</label>
                <button className="delete-btn" onClick={handleResetAccount}>Reset</button>
            </div>

            {/* Delete Account (Permanent) */}
            <div className="setting-item">
                <label>Delete Account (Permanent):</label>
                <button className="delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            {/* Back to Dashboard */}
            <button className="dashboard-btn" onClick={() => router.push("/dashboard")}>Back to Dashboard</button>
        </div>
    );
}
