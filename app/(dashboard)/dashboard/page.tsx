"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, TrendingUp, Award, Phone, MessageSquare, Filter } from "lucide-react"
import { DashboardChart } from "@/components/dashboard-chart"
import { DecryptedText } from "@/components/decrypted-text"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { useAuth } from "@/contexts/auth-context"
import { useMetrics } from "@/hooks/use-metrics"
import { useState } from "react"

export default function DashboardPage() {
  const { user } = useAuth()
  const { metricsData, selectedAgent, setSelectedAgent, dateRange, setDateRange, loading } = useMetrics()
  const [activeTab, setActiveTab] = useState<string>("daily")

  const agents = [
    { id: "all", name: "Todos os Agentes" },
    { id: "1", name: "Ana Silva" },
    { id: "2", name: "Carlos Santos" },
    { id: "3", name: "Maria Oliveira" },
    { id: "4", name: "João Costa" },
    { id: "5", name: "Fernanda Lima" },
  ]

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleAgentChange = (agentId: string) => {
    setSelectedAgent(agentId)
  }

  const renderMetricsCards = (period: "daily" | "weekly" | "monthly") => {
    const metrics = metricsData[period]

    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TME - Tempo Médio de Espera</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <DecryptedText text={metrics.tme.value} speed={25} delay={100} />
            </div>
            <p className="text-xs text-muted-foreground">{metrics.tme.change}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TMS - Tempo Médio de Serviço</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <DecryptedText text={metrics.tms.value} speed={25} delay={200} />
            </div>
            <p className="text-xs text-muted-foreground">{metrics.tms.change}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TMA - Tempo Médio de Atendimento</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <DecryptedText text={metrics.tma.value} speed={25} delay={300} />
            </div>
            <p className="text-xs text-muted-foreground">{metrics.tma.change}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <DecryptedText text={metrics.conversionRate.value} speed={25} delay={400} />
            </div>
            <p className="text-xs text-muted-foreground">{metrics.conversionRate.change}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              VIPs Liberados {period === "daily" ? "Hoje" : period === "weekly" ? "Esta Semana" : "Este Mês"}
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <DecryptedText text={metrics.vipsReleased.value} speed={25} delay={500} />
            </div>
            <p className="text-xs text-muted-foreground">{metrics.vipsReleased.change}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Atendimentos {period === "daily" ? "Hoje" : period === "weekly" ? "Semanais" : "Mensais"}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <DecryptedText text={metrics.totalAttendances.value} speed={25} delay={600} />
            </div>
            <p className="text-xs text-muted-foreground">{metrics.totalAttendances.change}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard de Atendimento</h1>
          <p className="text-muted-foreground">Visão geral das métricas de atendimento e performance da equipe.</p>
        </div>

        {user?.role === "admin" && (
          <div className="flex items-center gap-4">
            <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedAgent} onValueChange={handleAgentChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrar por agente" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="text-center py-4">
          <p className="text-muted-foreground">Carregando métricas...</p>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="daily">Hoje</TabsTrigger>
            <TabsTrigger value="weekly">Semana</TabsTrigger>
            <TabsTrigger value="monthly">Mês</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="daily" className="space-y-4">
          {renderMetricsCards("daily")}
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          {renderMetricsCards("weekly")}
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          {renderMetricsCards("monthly")}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Performance de Atendimento</CardTitle>
          <CardDescription>
            Evolução das métricas de atendimento ao longo do tempo
            {selectedAgent !== "all" && ` - ${agents.find((a) => a.id === selectedAgent)?.name}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <DashboardChart />
        </CardContent>
      </Card>
    </div>
  )
}
