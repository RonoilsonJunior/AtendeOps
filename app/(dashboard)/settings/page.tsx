"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Shield, Bell, Key, HelpCircle, Settings } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

const settingsCategories = [
  {
    title: "Perfil",
    description: "Gerencie suas informações pessoais",
    icon: User,
    href: "/settings/profile",
    roles: ["admin", "atendente"],
  },
  {
    title: "Segurança",
    description: "Altere sua senha e configurações de segurança",
    icon: Key,
    href: "/settings/security",
    roles: ["admin", "atendente"],
  },
  {
    title: "Notificações",
    description: "Configure alertas e notificações",
    icon: Bell,
    href: "/settings/communication",
    roles: ["admin", "atendente"],
  },
  {
    title: "Permissões",
    description: "Visualize seus níveis de acesso",
    icon: Shield,
    href: "/settings/permissions",
    roles: ["admin", "atendente"],
  },
]

export default function SettingsPage() {
  const { user } = useAuth()

  const availableSettings = settingsCategories.filter((setting) => setting.roles.includes(user?.role || ""))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas preferências e configurações de conta.</p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {availableSettings.map((setting, index) => {
          const IconComponent = setting.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconComponent className="h-5 w-5" />
                  {setting.title}
                </CardTitle>
                <CardDescription>{setting.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href={setting.href}>Acessar {setting.title}</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Ações Rápidas
          </CardTitle>
          <CardDescription>Acesso rápido às configurações mais utilizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings/profile">Editar Perfil</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings/security">Alterar Senha</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings/permissions">Ver Permissões</Link>
            </Button>
            {user?.role === "admin" && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/atendentes">Gerenciar Equipe</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Precisa de Ajuda?
          </CardTitle>
          <CardDescription>Recursos de suporte e documentação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/help">
                <HelpCircle className="mr-2 h-4 w-4" />
                Central de Ajuda
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
