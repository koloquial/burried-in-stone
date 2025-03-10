"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged, setPersistence, browserLocalPersistence, signOut as firebaseSignOut } from "firebase/auth";
import Loading from "@/components/Loading";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await setPersistence(auth, browserLocalPersistence); // Ensure persistence
                const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                    setUser(currentUser);
                    setLoading(false);
                });

                return () => unsubscribe();
            } catch (error) {
                console.error("Auth persistence error:", error);
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const signOut = async () => {
        await firebaseSignOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signOut }}>
            {!loading ? children : <Loading />}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
