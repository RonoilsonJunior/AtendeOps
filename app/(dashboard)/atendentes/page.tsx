"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, MoreHorizontal, UserCheck, UserX, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"

// Mock data for attendants
const attendants = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@empresa.com",
    avatar: "/placeholder.svg?height=40&width=40&text=AS",
    status: "online",
    role: "atendente",
    conversions: 156,
    avgResponseTime: "1m 45s",
    satisfaction: 4.9,
    joinedAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Carlos Santos",
    email: "carlos.santos@empresa.com",
    avatar: "/placeholder.svg?height=40&width=40&text=CS",
    status: "online",
    role: "atendente",
    conversions: 142,
    avgResponseTime: "2m 12s",
    satisfaction: 4.8,
    joinedAt: "2023-02-20",
  },
  {
    id: "3",
    name: "Maria Oliveira",
    email: "maria.oliveira@empresa.com",
    avatar: "/placeholder.svg?height=40&width=40&text=MO",
    status: "offline",
    role: "atendente",
    conversions: 134,
    avgResponseTime: "2m 34s",
    satisfaction: 4.7,
    joinedAt: "2023-03-10",
  },
  {
    id: "4",
    name: "João Pereira",
    email: "joao.pereira@empresa.com",
    avatar: "/placeholder.svg?height=40&width=40&text=JP",
    status: "busy",
    role: "atendente",
    conversions: 128,
    avgResponseTime: "2m 56s",
    satisfaction: 4.6,
    joinedAt: "2023-04-05",
  },
]

export default function AtendentesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { user } = useAuth()

  // Only admins can access this page
  if (user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Acesso Negado</h2>
          <p className="text-muted-foreground">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    )
  }

  const filteredAttendants = attendants.filter(
    (attendant) =>
      attendant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendant.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return (
          <Badge variant="default" className="bg-green-500">
            Online
          </Badge>
        )
      case "offline":
        return <Badge variant="secondary">Offline</Badge>
      case "busy":
        return <Badge variant="destructive">Ocupado</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Gerenciar Atendentes</h1>
          <p className="text-muted-foreground">Visualize e gerencie a equipe de atendimento.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Atendente
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar atendentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Atendentes</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendants.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Agora</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendants.filter((a) => a.status === "online").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ocupados</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendants.filter((a) => a.status === "busy").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offline</CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendants.filter((a) => a.status === "offline").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Attendants List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Atendentes</CardTitle>
          <CardDescription>Gerencie os atendentes da sua equipe</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAttendants.map((attendant) => (
              <div
                key={attendant.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={attendant.avatar || "/placeholder.svg"} alt={attendant.name} />
                    <AvatarFallback>
                      {attendant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{attendant.name}</h3>
                    <p className="text-sm text-muted-foreground">{attendant.email}</p>
                    <div className="flex items-center gap-2 mt-1">{getStatusBadge(attendant.status)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-medium">{attendant.conversions}</div>
                    <div className="text-muted-foreground">Conversões</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{attendant.avgResponseTime}</div>
                    <div className="text-muted-foreground">Tempo Resp.</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{attendant.satisfaction}</div>
                    <div className="text-muted-foreground">Satisfação</div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Definir Metas</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Desativar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
