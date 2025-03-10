"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        if (!user) return;

        try {
            const res = await fetch("/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: user.uid, email: user.email }),
            });

            if (res.status === 404) {
                console.warn("User not found in MongoDB. Creating new user...");

                // If user doesn't exist, create the user
                await createUserInMongoDB(user.uid, user.email);
                return;
            }

            if (!res.ok) throw new Error("Failed to fetch user data");

            const data = await res.json();
            setUserData(data.user);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    const createUserInMongoDB = async (uid, email) => {
        try {
            const res = await fetch("/api/create-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, email }),
            });

            if (!res.ok) throw new Error("Failed to create user in MongoDB");

            console.log("User successfully created in MongoDB.");
            await fetchUserData(); // Fetch the newly created user
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [user]);

    return (
        <UserContext.Provider value={{ userData, loading, refreshUserData: fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
