'use client'
import { Roboto, Silkscreen } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "500"], variable: "--font-primary" });
const silkscreen = Silkscreen({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-secondary" });

import '@/styles/index.css';
import { useEffect } from 'react'
import { SocketProvider } from "../context/SocketContext";
import { AuthProvider } from "../context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import BottomNav from '@/components/BottomNav';


export default function RootLayout({ children }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js").then(() => {
            console.log("Service Worker Registered");
        }).catch((err) => {
            console.error("Service Worker Registration Failed", err);
        });
    }
}, []);

  return (
    <html lang="en" className={`${roboto.variable} ${silkscreen.variable}`}>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <body>
        <SocketProvider>
          <AuthProvider>
            <UserProvider>
              {children}
              <BottomNav />
            </UserProvider>
          </AuthProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
