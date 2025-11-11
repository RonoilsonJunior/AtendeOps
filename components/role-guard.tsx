"use client"

import { useAuth, type UserRole } from "@/contexts/auth-context"
import type { ReactNode } from "react"

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: UserRole[]
  fallback?: ReactNode
}

export function RoleGuard({ children, allowedRoles, fallback }: RoleGuardProps) {
  const { user } = useAuth()

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Acesso Restrito</h3>
            <p className="text-muted-foreground">Você não tem permissão para acessar este conteúdo.</p>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
}
