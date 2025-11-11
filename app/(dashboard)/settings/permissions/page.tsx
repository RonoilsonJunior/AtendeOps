"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, User, Settings, Users, BarChart3, Trophy } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { RoleGuard } from "@/components/role-guard"

const adminPermissions = [
  {
    category: "Gerenciamento de Usuários",
    icon: Users,
    permissions: [
      { name: "Visualizar todos os atendentes", granted: true },
      { name: "Criar novos atendentes", granted: true },
      { name: "Editar perfis de atendentes", granted: true },
      { name: "Desativar atendentes", granted: true },
      { name: "Definir metas para atendentes", granted: true },
    ],
  },
  {
    category: "Métricas e Relatórios",
    icon: BarChart3,
    permissions: [
      { name: "Visualizar métricas globais", granted: true },
      { name: "Exportar relatórios", granted: true },
      { name: "Configurar dashboards", granted: true },
      { name: "Acessar dados históricos", granted: true },
    ],
  },
  {
    category: "Ranking e Performance",
    icon: Trophy,
    permissions: [
      { name: "Visualizar ranking completo", granted: true },
      { name: "Modificar critérios de ranking", granted: true },
      { name: "Gerenciar premiações", granted: true },
    ],
  },
  {
    category: "Configurações do Sistema",
    icon: Settings,
    permissions: [
      { name: "Configurar sistema", granted: true },
      { name: "Gerenciar integrações", granted: true },
      { name: "Backup e restauração", granted: true },
    ],
  },
]

const attendantPermissions = [
  {
    category: "Métricas Pessoais",
    icon: BarChart3,
    permissions: [
      { name: "Visualizar suas métricas", granted: true },
      { name: "Acompanhar progresso de metas", granted: true },
      { name: "Ver histórico pessoal", granted: true },
    ],
  },
  {
    category: "Ranking",
    icon: Trophy,
    permissions: [
      { name: "Visualizar ranking geral", granted: true },
      { name: "Ver sua posição no ranking", granted: true },
    ],
  },
  {
    category: "Perfil",
    icon: User,
    permissions: [
      { name: "Editar perfil pessoal", granted: true },
      { name: "Alterar senha", granted: true },
      { name: "Configurar notificações", granted: true },
    ],
  },
  {
    category: "Restrições",
    icon: Shield,
    permissions: [
      { name: "Gerenciar outros atendentes", granted: false },
      { name: "Acessar configurações do sistema", granted: false },
      { name: "Modificar metas de outros", granted: false },
      { name: "Exportar dados globais", granted: false },
    ],
  },
]

export default function PermissionsSettingsPage() {
  const { user } = useAuth()

  const userPermissions = user?.role === "admin" ? adminPermissions : attendantPermissions

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="default" className="bg-purple-500">
            <Shield className="w-3 h-3 mr-1" />
            Administrador
          </Badge>
        )
      case "atendente":
        return (
          <Badge variant="secondary">
            <User className="w-3 h-3 mr-1" />
            Atendente
          </Badge>
        )
      default:
        return <Badge variant="outline">Usuário</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Permissões e Acesso</h1>
        <p className="text-muted-foreground">Visualize suas permissões e níveis de acesso no sistema.</p>
      </div>

      {/* User Role Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Seu Nível de Acesso
          </CardTitle>
          <CardDescription>Informações sobre sua função e permissões no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{user?.name}</h3>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <div>{user?.role && getRoleBadge(user.role)}</div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions List */}
      <div className="space-y-4">
        {userPermissions.map((category, index) => {
          const IconComponent = category.icon
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconComponent className="h-5 w-5" />
                  {category.category}
                </CardTitle>
                <CardDescription>Permissões relacionadas a {category.category.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.permissions.map((permission, permIndex) => (
                    <div key={permIndex} className="flex items-center justify-between">
                      <span className="text-sm">{permission.name}</span>
                      <Badge
                        variant={permission.granted ? "default" : "secondary"}
                        className={permission.granted ? "bg-green-500" : ""}
                      >
                        {permission.granted ? "Permitido" : "Negado"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Admin Notice */}
      <RoleGuard allowedRoles={["admin"]}>
        <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
              <Shield className="h-5 w-5" />
              Privilégios de Administrador
            </CardTitle>
            <CardDescription className="text-purple-600 dark:text-purple-400">
              Como administrador, você tem acesso completo a todas as funcionalidades do sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Suas permissões incluem gerenciamento completo de usuários, acesso a todas as métricas, configuração do
              sistema e controle total sobre rankings e metas.
            </p>
          </CardContent>
        </Card>
      </RoleGuard>

      {/* Attendant Notice */}
      <RoleGuard allowedRoles={["atendente"]}>
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <User className="h-5 w-5" />
              Perfil de Atendente
            </CardTitle>
            <CardDescription className="text-blue-600 dark:text-blue-400">
              Suas permissões são focadas em acompanhar sua performance individual.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Você pode visualizar suas métricas, acompanhar metas, ver sua posição no ranking e gerenciar seu perfil
              pessoal. Para solicitar acesso adicional, entre em contato com um administrador.
            </p>
          </CardContent>
        </Card>
      </RoleGuard>
    </div>
  )
}
