"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import "./styles.css";

export default function Profile() {
    const { user } = useAuth();
    const router = useRouter();
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
        <div className="profile">
            <div className='content-block'>
                <label>Profile</label>
            </div>
            <div className='content-block'>
                <label>Details</label>
                <p><strong>Email:</strong> {user?.email}</p>
            </div>
        </div>
    );
}
