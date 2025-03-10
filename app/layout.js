import '@/styles/index.css';
import { SocketProvider } from "../context/SocketContext";
import { AuthProvider } from "../context/AuthContext";
import { UserProvider } from "@/context/UserContext";
import BottomNav from '@/components/BottomNav';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
