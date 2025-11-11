"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, TrendingUp, Clock, Award, Users, Calendar, CheckCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

// Mock data for individual goals
const userGoals = {
  monthly: [
    {
      id: "1",
      title: "Conversões Mensais",
      description: "Meta de conversões para este mês",
      target: 150,
      current: 142,
      unit: "conversões",
      deadline: "2024-01-31",
      status: "on-track",
      icon: TrendingUp,
    },
    {
      id: "2",
      title: "Tempo Médio de Resposta",
      description: "Manter tempo de resposta abaixo de 2 minutos",
      target: 120, // em segundos
      current: 132, // em segundos
      unit: "segundos",
      deadline: "2024-01-31",
      status: "at-risk",
      icon: Clock,
    },
    {
      id: "3",
      title: "VIPs Liberados",
      description: "Meta de liberação de clientes VIP",
      target: 40,
      current: 38,
      unit: "VIPs",
      deadline: "2024-01-31",
      status: "on-track",
      icon: Award,
    },
    {
      id: "4",
      title: "Satisfação do Cliente",
      description: "Manter nota de satisfação acima de 4.5",
      target: 4.5,
      current: 4.8,
      unit: "/5.0",
      deadline: "2024-01-31",
      status: "achieved",
      icon: Users,
    },
  ],
  weekly: [
    {
      id: "5",
      title: "Conversões Semanais",
      description: "Meta semanal de conversões",
      target: 35,
      current: 32,
      unit: "conversões",
      deadline: "2024-01-07",
      status: "on-track",
      icon: TrendingUp,
    },
    {
      id: "6",
      title: "Atendimentos por Dia",
      description: "Média de atendimentos diários",
      target: 25,
      current: 28,
      unit: "atendimentos",
      deadline: "2024-01-07",
      status: "achieved",
      icon: Users,
    },
  ],
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "achieved":
      return (
        <Badge variant="default" className="bg-green-500">
          <CheckCircle className="w-3 h-3 mr-1" />
          Alcançada
        </Badge>
      )
    case "on-track":
      return (
        <Badge variant="default" className="bg-blue-500">
          <Target className="w-3 h-3 mr-1" />
          No Prazo
        </Badge>
      )
    case "at-risk":
      return (
        <Badge variant="destructive">
          <AlertCircle className="w-3 h-3 mr-1" />
          Em Risco
        </Badge>
      )
    default:
      return <Badge variant="outline">Pendente</Badge>
  }
}

const formatValue = (value: number, unit: string) => {
  if (unit === "segundos") {
    const minutes = Math.floor(value / 60)
    const seconds = value % 60
    return `${minutes}m ${seconds}s`
  }
  return `${value}${unit}`
}

const calculateProgress = (current: number, target: number, unit: string) => {
  if (unit === "segundos") {
    // For time-based goals, lower is better
    return Math.max(0, Math.min(100, ((target - current + target) / target) * 100))
  }
  return Math.min(100, (current / target) * 100)
}

export default function MetasPage() {
  const [activeTab, setActiveTab] = useState("monthly")
  const { user } = useAuth()

  const currentGoals = userGoals[activeTab as keyof typeof userGoals] || []

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Minhas Metas</h1>
        <p className="text-muted-foreground">Acompanhe seu progresso e alcance seus objetivos de performance.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Metas Alcançadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">de 6 metas totais</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">No Prazo</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">metas em andamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Risco</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">precisa de atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Geral</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">média de progresso</p>
          </CardContent>
        </Card>
      </div>

      {/* Goals Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="monthly">Metas Mensais</TabsTrigger>
          <TabsTrigger value="weekly">Metas Semanais</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {userGoals.monthly.map((goal) => {
              const IconComponent = goal.icon
              const progress = calculateProgress(goal.current, goal.target, goal.unit)

              return (
                <Card key={goal.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                      </div>
                      {getStatusBadge(goal.status)}
                    </div>
                    <CardDescription>{goal.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span className="font-medium">
                          {formatValue(goal.current, goal.unit)} / {formatValue(goal.target, goal.unit)}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{Math.round(progress)}% concluído</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(goal.deadline).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {userGoals.weekly.map((goal) => {
              const IconComponent = goal.icon
              const progress = calculateProgress(goal.current, goal.target, goal.unit)

              return (
                <Card key={goal.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                      </div>
                      {getStatusBadge(goal.status)}
                    </div>
                    <CardDescription>{goal.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span className="font-medium">
                          {formatValue(goal.current, goal.unit)} / {formatValue(goal.target, goal.unit)}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{Math.round(progress)}% concluído</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(goal.deadline).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button variant="outline">
          <Target className="mr-2 h-4 w-4" />
          Solicitar Nova Meta
        </Button>
        <Button variant="outline">
          <TrendingUp className="mr-2 h-4 w-4" />
          Ver Histórico
        </Button>
      </div>
    </div>
  )
}
