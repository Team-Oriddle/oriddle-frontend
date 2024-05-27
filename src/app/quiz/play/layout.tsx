import { SocketProvider } from "@/entities/socket/lib/SocketContext";

export default function Layout({ children }) {
  return (
    <SocketProvider>
      <main>{children}</main>
    </SocketProvider>
  )
}