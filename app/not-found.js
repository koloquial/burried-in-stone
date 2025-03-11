"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push("/"); // Redirect to home page
        }, 1000); // Redirect after 2 seconds

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <Loading />
    );
}
