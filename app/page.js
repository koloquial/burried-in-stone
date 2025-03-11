"use client";
import "./styles.css";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import Loading from "@/components/Loading";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const socket = useSocket();

  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // Redirect to dashboard if logged in
    }
  }, [user, router]);

  if (user) return <Loading />;

  return (
    <div className='splash'>
      <div className='title'>
        <h1>Burried</h1>
        <h2>in Stone</h2>
      </div>
      <AuthForm />
    </div>
  );
}
