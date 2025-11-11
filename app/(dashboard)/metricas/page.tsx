"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Clock, MessageSquare, Phone, TrendingUp, Award, Users, Target } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { DecryptedText } from "@/components/decrypted-text"

// Mock data for individual metrics
const individualMetrics = {
  daily: {
    tme: { value: "1m 45s", target: "2m 00s", progress: 87, trend: "down" },
    tms: { value: "8m 12s", target: "8m 00s", progress: 98, trend: "up" },
    tma: { value: "9m 57s", target: "10m 00s", progress: 95, trend: "down" },
    conversions: { value: 12, target: 15, progress: 80, trend: "up" },
    vips: { value: 3, target: 2, progress: 150, trend: "up" },
    satisfaction: { value: 4.8, target: 4.5, progress: 107, trend: "stable" },
  },
  weekly: {
    tme: { value: "2m 12s", target: "2m 30s", progress: 88, trend: "down" },
    tms: { value: "7m 45s", target: "8m 00s", progress: 97, trend: "stable" },
    tma: { value: "9m 57s", target: "10m 30s", progress: 95, trend: "down" },
    conversions: { value: 78, target: 85, progress: 92, trend: "up" },
    vips: { value: 18, target: 15, progress: 120, trend: "up" },
    satisfaction: { value: 4.7, target: 4.5, progress: 104, trend: "stable" },
  },
  monthly: {
    tme: { value: "2m 34s", target: "3m 00s", progress: 85, trend: "down" },
    tms: { value: "8m 23s", target: "8m 30s", progress: 99, trend: "stable" },
    tma: { value: "10m 57s", target: "11m 30s", progress: 95, trend: "down" },
    conversions: { value: 342, target: 350, progress: 98, trend: "up" },
    vips: { value: 78, target: 70, progress: 111, trend: "up" },
    satisfaction: { value: 4.6, target: 4.5, progress: 102, trend: "up" },
  },
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-green-500" />
    case "down":
      return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
    default:
      return <div className="h-4 w-4 bg-gray-300 rounded-full" />
  }
}

const getProgressColor = (progress: number) => {
  if (progress >= 100) return "bg-green-500"
  if (progress >= 80) return "bg-blue-500"
  if (progress >= 60) return "bg-yellow-500"
  return "bg-red-500"
}

export default function MetricasPage() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Minhas Métricas</h1>
        <p className="text-muted-foreground">Acompanhe sua performance individual e compare com suas metas.</p>
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="daily">Hoje</TabsTrigger>
            <TabsTrigger value="weekly">Esta Semana</TabsTrigger>
            <TabsTrigger value="monthly">Este Mês</TabsTrigger>
          </TabsList>
        </div>

        {Object.entries(individualMetrics).map(([period, metrics]) => (
          <TabsContent key={period} value={period} className="space-y-6">
            {/* Time Metrics */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Métricas de Tempo</h3>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">TME - Tempo Médio de Espera</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        <DecryptedText text={metrics.tme.value} delay={50} />
                      </div>
                      {getTrendIcon(metrics.tme.trend)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Meta: {metrics.tme.target}</span>
                        <span>
                          <DecryptedText text={`${metrics.tme.progress}%`} delay={100} />
                        </span>
                      </div>
                      <Progress value={metrics.tme.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">TMS - Tempo Médio de Serviço</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        <DecryptedText text={metrics.tms.value} delay={150} />
                      </div>
                      {getTrendIcon(metrics.tms.trend)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Meta: {metrics.tms.target}</span>
                        <span>
                          <DecryptedText text={`${metrics.tms.progress}%`} delay={200} />
                        </span>
                      </div>
                      <Progress value={metrics.tms.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">TMA - Tempo Médio de Atendimento</CardTitle>
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        <DecryptedText text={metrics.tma.value} delay={250} />
                      </div>
                      {getTrendIcon(metrics.tma.trend)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Meta: {metrics.tma.target}</span>
                        <span>
                          <DecryptedText text={`${metrics.tma.progress}%`} delay={300} />
                        </span>
                      </div>
                      <Progress value={metrics.tma.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Métricas de Performance</h3>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversões</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        <DecryptedText text={metrics.conversions.value.toString()} delay={350} />
                      </div>
                      {getTrendIcon(metrics.conversions.trend)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Meta: {metrics.conversions.target}</span>
                        <span>
                          <DecryptedText text={`${metrics.conversions.progress}%`} delay={400} />
                        </span>
                      </div>
                      <Progress value={metrics.conversions.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">VIPs Liberados</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        <DecryptedText text={metrics.vips.value.toString()} delay={450} />
                      </div>
                      {getTrendIcon(metrics.vips.trend)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Meta: {metrics.vips.target}</span>
                        <span>
                          <DecryptedText text={`${metrics.vips.progress}%`} delay={500} />
                        </span>
                      </div>
                      <Progress value={Math.min(100, metrics.vips.progress)} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Satisfação do Cliente</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        <DecryptedText text={`${metrics.satisfaction.value}/5.0`} delay={550} />
                      </div>
                      {getTrendIcon(metrics.satisfaction.trend)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Meta: {metrics.satisfaction.target}/5.0</span>
                        <span>
                          <DecryptedText text={`${metrics.satisfaction.progress}%`} delay={600} />
                        </span>
                      </div>
                      <Progress value={Math.min(100, metrics.satisfaction.progress)} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Resumo de Performance
                </CardTitle>
                <CardDescription>Sua performance geral para o período selecionado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      <DecryptedText
                        text={Object.values(metrics)
                          .filter((m) => m.progress >= 100)
                          .length.toString()}
                        delay={650}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">Metas Alcançadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      <DecryptedText
                        text={Object.values(metrics)
                          .filter((m) => m.progress >= 80 && m.progress < 100)
                          .length.toString()}
                        delay={700}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">Próximo da Meta</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      <DecryptedText
                        text={Object.values(metrics)
                          .filter((m) => m.progress >= 60 && m.progress < 80)
                          .length.toString()}
                        delay={750}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">Precisa Melhorar</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      <DecryptedText
                        text={`${Math.round(
                          Object.values(metrics).reduce((acc, m) => acc + Math.min(100, m.progress), 0) /
                            Object.values(metrics).length,
                        )}%`}
                        delay={800}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">Performance Geral</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
