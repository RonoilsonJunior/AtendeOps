import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for attendants ranking
const attendantsRanking = [
  {
    id: "1",
    name: "Ana Silva",
    avatar: "/placeholder.svg?height=40&width=40&text=AS",
    position: 1,
    score: 98.5,
    conversions: 156,
    avgResponseTime: "1m 45s",
    vipsReleased: 42,
    satisfaction: 4.9,
    trend: "up",
  },
  {
    id: "2",
    name: "Carlos Santos",
    avatar: "/placeholder.svg?height=40&width=40&text=CS",
    position: 2,
    score: 95.2,
    conversions: 142,
    avgResponseTime: "2m 12s",
    vipsReleased: 38,
    satisfaction: 4.8,
    trend: "up",
  },
  {
    id: "3",
    name: "Maria Oliveira",
    avatar: "/placeholder.svg?height=40&width=40&text=MO",
    position: 3,
    score: 92.8,
    conversions: 134,
    avgResponseTime: "2m 34s",
    vipsReleased: 35,
    satisfaction: 4.7,
    trend: "stable",
  },
  {
    id: "4",
    name: "João Pereira",
    avatar: "/placeholder.svg?height=40&width=40&text=JP",
    position: 4,
    score: 89.1,
    conversions: 128,
    avgResponseTime: "2m 56s",
    vipsReleased: 31,
    satisfaction: 4.6,
    trend: "down",
  },
  {
    id: "5",
    name: "Fernanda Costa",
    avatar: "/placeholder.svg?height=40&width=40&text=FC",
    position: 5,
    score: 87.3,
    conversions: 119,
    avgResponseTime: "3m 18s",
    vipsReleased: 28,
    satisfaction: 4.5,
    trend: "up",
  },
  {
    id: "6",
    name: "Roberto Lima",
    avatar: "/placeholder.svg?height=40&width=40&text=RL",
    position: 6,
    score: 84.7,
    conversions: 112,
    avgResponseTime: "3m 42s",
    vipsReleased: 25,
    satisfaction: 4.4,
    trend: "stable",
  },
]

const getRankIcon = (position: number) => {
  switch (position) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />
    default:
      return <span className="text-sm font-medium text-muted-foreground">#{position}</span>
  }
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

export default function RankingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Ranking de Atendentes</h1>
        <p className="text-muted-foreground">Performance e classificação da equipe de atendimento.</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {attendantsRanking.slice(0, 3).map((attendant, index) => (
          <Card key={attendant.id} className={`relative ${index === 0 ? "ring-2 ring-yellow-500" : ""}`}>
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2">{getRankIcon(attendant.position)}</div>
              <Avatar className="h-16 w-16 mx-auto mb-2">
                <AvatarImage src={attendant.avatar || "/placeholder.svg"} alt={attendant.name} />
                <AvatarFallback>
                  {attendant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">{attendant.name}</CardTitle>
              <CardDescription>Score: {attendant.score}%</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Conversões:</span>
                <span className="font-medium">{attendant.conversions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">VIPs:</span>
                <span className="font-medium">{attendant.vipsReleased}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Satisfação:</span>
                <span className="font-medium">{attendant.satisfaction}/5.0</span>
              </div>
              <Progress value={attendant.score} className="mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Ranking Table */}
      <Card>
        <CardHeader>
          <CardTitle>Ranking Completo</CardTitle>
          <CardDescription>Classificação detalhada de todos os atendentes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendantsRanking.map((attendant) => (
              <div
                key={attendant.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8">{getRankIcon(attendant.position)}</div>
                  <Avatar className="h-10 w-10">
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
                    <p className="text-sm text-muted-foreground">Score: {attendant.score}%</p>
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
                    <div className="font-medium">{attendant.vipsReleased}</div>
                    <div className="text-muted-foreground">VIPs</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{attendant.satisfaction}</div>
                    <div className="text-muted-foreground">Satisfação</div>
                  </div>
                  <div className="flex items-center">{getTrendIcon(attendant.trend)}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Melhor Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Ana Silva</div>
            <p className="text-xs text-muted-foreground">156 conversões este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resposta Mais Rápida</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Ana Silva</div>
            <p className="text-xs text-muted-foreground">1m 45s tempo médio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mais VIPs Liberados</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Ana Silva</div>
            <p className="text-xs text-muted-foreground">42 VIPs este mês</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
