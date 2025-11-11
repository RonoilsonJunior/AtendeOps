import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { SidebarProvider } from "@/components/sidebar-provider"
import { AuthGuard } from "@/components/auth-guard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="min-h-screen bg-background">
          <Sidebar />
          <div className="lg:pl-72">
            <Header />
            <main className="p-4 md:p-6 lg:p-8">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </AuthGuard>
  )
}
