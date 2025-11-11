"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Calendar, Shield } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function ProfileSettingsPage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  const handleSave = () => {
    // Here you would typically save to a backend
    console.log("Saving profile data:", formData)
    setIsEditing(false)
  }

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
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Configurações do Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e preferências de conta.</p>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Informações do Perfil
          </CardTitle>
          <CardDescription>Visualize e edite suas informações pessoais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
              <AvatarFallback className="text-lg">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-semibold">{user?.name}</h3>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              <div className="flex items-center gap-2">{user?.role && getRoleBadge(user.role)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Informações Pessoais
          </CardTitle>
          <CardDescription>Atualize seus dados pessoais aqui</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={isEditing ? formData.name : user?.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                placeholder="Seu nome completo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={isEditing ? formData.email : user?.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                placeholder="seu@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Função</Label>
              <Input
                id="role"
                value={user?.role === "admin" ? "Administrador" : "Atendente"}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>
              ) : (
                <>
                  <Button onClick={handleSave}>Salvar Alterações</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Informações da Conta
          </CardTitle>
          <CardDescription>Detalhes sobre sua conta no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">ID do Usuário:</span>
              <span className="text-sm text-muted-foreground">{user?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Tipo de Conta:</span>
              <span className="text-sm text-muted-foreground">
                {user?.role === "admin" ? "Administrador" : "Atendente"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Status:</span>
              <Badge variant="default" className="bg-green-500">
                Ativo
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
