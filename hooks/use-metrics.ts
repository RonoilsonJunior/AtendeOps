"use client"

import { useState, useEffect } from "react"
import type { MetricsData, WebhookMetricsPayload } from "@/types/metrics"
import type { DateRange } from "react-day-picker"

// Mock data - será substituído por dados reais do webhook
const mockMetricsData: MetricsData = {
  daily: {
    tme: { value: "2m 34s", change: "-15% desde ontem", changeType: "decrease" },
    tms: { value: "8m 12s", change: "+3% desde ontem", changeType: "increase" },
    tma: { value: "10m 46s", change: "-8% desde ontem", changeType: "decrease" },
    conversionRate: { value: "73.2%", change: "+5.2% desde ontem", changeType: "increase" },
    vipsReleased: { value: "18", change: "+12% desde ontem", changeType: "increase" },
    totalAttendances: { value: "247", change: "+8% desde ontem", changeType: "increase" },
  },
  weekly: {
    tme: { value: "3m 12s", change: "-8% desde semana passada", changeType: "decrease" },
    tms: { value: "7m 45s", change: "+2% desde semana passada", changeType: "increase" },
    tma: { value: "10m 57s", change: "-5% desde semana passada", changeType: "decrease" },
    conversionRate: { value: "71.8%", change: "+3.1% desde semana passada", changeType: "increase" },
    vipsReleased: { value: "124", change: "+18% desde semana passada", changeType: "increase" },
    totalAttendances: { value: "1,847", change: "+12% desde semana passada", changeType: "increase" },
  },
  monthly: {
    tme: { value: "3m 45s", change: "-12% desde mês passado", changeType: "decrease" },
    tms: { value: "8m 23s", change: "+5% desde mês passado", changeType: "increase" },
    tma: { value: "12m 08s", change: "-7% desde mês passado", changeType: "decrease" },
    conversionRate: { value: "69.4%", change: "+7.2% desde mês passado", changeType: "increase" },
    vipsReleased: { value: "542", change: "+22% desde mês passado", changeType: "increase" },
    totalAttendances: { value: "7,234", change: "+15% desde mês passado", changeType: "increase" },
  },
}

export function useMetrics() {
  const [metricsData, setMetricsData] = useState<MetricsData>(mockMetricsData)
  const [selectedAgent, setSelectedAgent] = useState<string>("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [loading, setLoading] = useState(false)

  // Função para atualizar métricas via webhook
  const updateMetrics = (payload: WebhookMetricsPayload) => {
    setMetricsData((prev) => ({
      ...prev,
      [payload.period]: payload.metrics,
    }))
  }

  const fetchAgentMetrics = async (agentId: string, dateFilter?: DateRange) => {
    if (agentId === "all" && !dateFilter) {
      setMetricsData(mockMetricsData)
      return
    }

    setLoading(true)
    try {
      // Aqui você faria a chamada para sua API com os filtros
      // const params = new URLSearchParams()
      // if (agentId !== "all") params.append("agentId", agentId)
      // if (dateFilter?.from) params.append("startDate", dateFilter.from.toISOString())
      // if (dateFilter?.to) params.append("endDate", dateFilter.to.toISOString())
      // const response = await fetch(`/api/metrics?${params}`)
      // const data = await response.json()
      // setMetricsData(data)

      // Por enquanto, usando dados mock
      setTimeout(() => {
        setMetricsData(mockMetricsData)
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error("Erro ao buscar métricas:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAgentMetrics(selectedAgent, dateRange)
  }, [selectedAgent, dateRange])

  return {
    metricsData,
    selectedAgent,
    setSelectedAgent,
    dateRange,
    setDateRange,
    loading,
    updateMetrics,
    fetchAgentMetrics,
  }
}
