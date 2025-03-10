"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function Profile() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!user) {
            router.push("/");
        } else {
            setLoading(false);
        }
    }, [user, router]);

    const handleUpdateProfile = async () => {
        setError("");
        setSuccess("");

        if (displayName.length < 3 || displayName.length > 20) {
            setError("Display name must be between 3 and 20 characters.");
            return;
        }

        try {
            await user.updateProfile({ displayName });
            setSuccess("Profile updated successfully!");
        } catch (err) {
            setError("Failed to update profile.");
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <p><strong>Email:</strong> {user?.email}</p>

            <p className='label'>Display Name:</p>
            <input 
                type="text" 
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)} 
                placeholder="Enter display name" 
            />

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button onClick={handleUpdateProfile}>Update Profile</button>
            <button className="dashboard-btn" onClick={() => router.push("/dashboard")}>Back to Dashboard</button>
        </div>
    );
}
