import { SocketContext } from "@/entities/socket/lib/SocketContext";

export default function Layout({ children }) {
  return (
    <SocketContext.Provider value={'hello'}>
      <main>{children}</main>
    </SocketContext.Provider>
  )
}