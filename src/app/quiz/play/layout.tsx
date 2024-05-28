import { SocketProvider } from "@/entities/socket/lib/SocketProvider";

export default function Layout({ children }) {
  return (
    <SocketProvider>
      <main>{children}</main>
    </SocketProvider>
  )
}