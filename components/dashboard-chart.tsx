"use client"

import { useEffect, useState } from "react"
import { DecryptedText } from "./decrypted-text"

export function DashboardChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[400px] w-full bg-muted/20 rounded-md animate-pulse">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <p className="text-muted-foreground ml-2 font-medium">Carregando métricas de atendimento...</p>
        </div>
      </div>
    )
  }

  const weeklyData = [
    { day: "02 Mon", atendimentos: 1800, conversoes: 1200 },
    { day: "03 Tue", atendimentos: 2100, conversoes: 1400 },
    { day: "04 Wed", atendimentos: 1900, conversoes: 1300 },
    { day: "05 Thu", atendimentos: 2400, conversoes: 1600 },
    { day: "06 Fri", atendimentos: 2700, conversoes: 1800 },
    { day: "07 Sat", atendimentos: 2200, conversoes: 1500 },
    { day: "08 Sun", atendimentos: 1800, conversoes: 1200 },
  ]

  const maxValue = 3600 // Valor máximo para escala

  const createSmoothPath = (data: number[], isArea = false) => {
    const points = data.map((value, index) => ({
      x: (index * 100) / (data.length - 1),
      y: 100 - (value / maxValue) * 100,
    }))

    let path = `M ${points[0].x} ${points[0].y}`

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const cpx1 = prev.x + (curr.x - prev.x) * 0.5
      const cpy1 = prev.y
      const cpx2 = prev.x + (curr.x - prev.x) * 0.5
      const cpy2 = curr.y

      path += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${curr.x} ${curr.y}`
    }

    if (isArea) {
      path += ` L 100 100 L 0 100 Z`
    }

    return path
  }

  return (
    <div className="w-full animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 ease-out">
      <div className="bg-card rounded-lg border p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Atendimentos vs. Conversões</h3>
          <select className="bg-background border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-muted-foreground">
            <option>Esta Semana</option>
          </select>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#374151" }}></div>
            <span className="text-sm text-muted-foreground">Atendimentos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#9CA3AF" }}></div>
            <span className="text-sm text-muted-foreground">Conversões</span>
          </div>
        </div>

        <div className="relative h-[280px] w-full">
          {/* Eixo Y */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground py-2">
            <span>36k</span>
            <span>27k</span>
            <span>18k</span>
            <span>9k</span>
            <span>0k</span>
          </div>

          {/* Área do gráfico */}
          <div className="ml-8 h-full relative">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="overflow-visible"
            >
              <defs>
                <linearGradient id="atendimentosGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#374151" stopOpacity="1" />
                  <stop offset="100%" stopColor="#374151" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="conversoesGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#9CA3AF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#9CA3AF" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Área de atendimentos (base) */}
              <path
                d={createSmoothPath(
                  weeklyData.map((d) => d.atendimentos),
                  true,
                )}
                fill="url(#atendimentosGrad)"
                className="animate-in fade-in-0 duration-1500"
              />

              {/* Área de conversões (topo) */}
              <path
                d={createSmoothPath(
                  weeklyData.map((d) => d.conversoes),
                  true,
                )}
                fill="url(#conversoesGrad)"
                className="animate-in fade-in-0 duration-1500"
                style={{ animationDelay: "300ms" }}
              />

              {/* Linha branca de separação */}
              <path
                d={createSmoothPath(weeklyData.map((d) => d.conversoes))}
                fill="none"
                stroke="white"
                strokeWidth="0.3"
                className="animate-in fade-in-0 duration-1500"
                style={{ animationDelay: "600ms" }}
              />
            </svg>
          </div>

          {/* Eixo X igual à referência */}
          <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-muted-foreground">
            {weeklyData.map((d) => (
              <span key={d.day}>{d.day}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-6 border-2 border-primary/20 rounded-lg bg-primary/5 hover:border-primary/40 transition-colors">
          <p className="text-muted-foreground font-medium mb-2">Total Atendimentos</p>
          <p className="text-4xl font-bold text-primary tracking-tight">
            <DecryptedText text="15.0k" speed={15} delay={200} />
          </p>
        </div>
        <div className="text-center p-6 border-2 border-green-500/20 rounded-lg bg-green-500/5 hover:border-green-500/40 transition-colors">
          <p className="text-muted-foreground font-medium mb-2">Total Conversões</p>
          <p className="text-4xl font-bold text-green-500 tracking-tight">
            <DecryptedText text="10.0k" speed={15} delay={400} />
          </p>
        </div>
        <div className="text-center p-6 border-2 border-blue-500/20 rounded-lg bg-blue-500/5 hover:border-blue-500/40 transition-colors">
          <p className="text-muted-foreground font-medium mb-2">Taxa Conversão</p>
          <p className="text-4xl font-bold text-blue-500 tracking-tight">
            <DecryptedText text="66.7%" speed={15} delay={600} />
          </p>
        </div>
        <div className="text-center p-6 border-2 border-orange-500/20 rounded-lg bg-orange-500/5 hover:border-orange-500/40 transition-colors">
          <p className="text-muted-foreground font-medium mb-2">Média Diária</p>
          <p className="text-4xl font-bold text-orange-500 tracking-tight">
            <DecryptedText text="2.1k" speed={15} delay={800} />
          </p>
        </div>
      </div>
    </div>
  )
}
