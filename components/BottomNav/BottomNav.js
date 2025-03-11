"use client";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaUser, FaCog, FaSignOutAlt, FaBook, FaHome } from "react-icons/fa"; // Import Home icon

export default function BottomNav() {
    const pathname = usePathname();
    const router = useRouter();
    const { signOut } = useAuth();

    // List of pages where BottomNav should be visible
    const privatePages = ["/dashboard", "/new-character", "/profile", "/settings", "/wiki"];

    // Check if pathname starts with "/character/" (for dynamic character pages)
    const isCharacterPage = pathname.startsWith("/character/");

    // Show BottomNav only on allowed pages or dynamic character pages
    if (!privatePages.includes(pathname) && !isCharacterPage) return null;

    return (
        <nav className="bottom-nav">
            <button onClick={() => router.push("/dashboard")}>
                <FaHome className="nav-icon" />
                <span>Home</span>
            </button>

            <button onClick={() => router.push("/profile")}>
                <FaUser className="nav-icon" />
                <span>Profile</span>
            </button>

            <button onClick={() => router.push("/settings")}>
                <FaCog className="nav-icon" />
                <span>Settings</span>
            </button>

            <button onClick={() => router.push("/wiki")}>
                <FaBook className="nav-icon" />
                <span>Wiki</span>
            </button>

            <button onClick={signOut}>
                <FaSignOutAlt className="nav-icon" />
                <span>Logout</span>
            </button>
        </nav>
    );
}
