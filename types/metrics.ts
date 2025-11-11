export interface MetricValue {
  value: string
  change: string
  changeType: "increase" | "decrease" | "neutral"
}

export interface DashboardMetrics {
  tme: MetricValue
  tms: MetricValue
  tma: MetricValue
  conversionRate: MetricValue
  vipsReleased: MetricValue
  totalAttendances: MetricValue
}

export interface MetricsData {
  daily: DashboardMetrics
  weekly: DashboardMetrics
  monthly: DashboardMetrics
}

export interface Agent {
  id: string
  name: string
}

export interface WebhookMetricsPayload {
  agentId?: string
  period: "daily" | "weekly" | "monthly"
  metrics: DashboardMetrics
  timestamp: string
}
