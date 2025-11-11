import { type NextRequest, NextResponse } from "next/server"
import type { WebhookMetricsPayload } from "@/types/metrics"

export async function POST(request: NextRequest) {
  try {
    const payload: WebhookMetricsPayload = await request.json()

    // Validação básica do payload
    if (!payload.period || !payload.metrics || !payload.timestamp) {
      return NextResponse.json(
        { error: "Payload inválido. Campos obrigatórios: period, metrics, timestamp" },
        { status: 400 },
      )
    }

    // Aqui você processaria os dados recebidos
    // Por exemplo: salvar no banco de dados, atualizar cache, etc.
    console.log("Métricas recebidas via webhook:", payload)

    // Exemplo de como você poderia notificar clientes conectados via WebSocket
    // broadcastMetricsUpdate(payload)

    return NextResponse.json({
      success: true,
      message: "Métricas atualizadas com sucesso",
      receivedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Erro ao processar webhook de métricas:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

// Exemplo de payload esperado:
/*
{
  "agentId": "123", // opcional - se não informado, são métricas gerais
  "period": "daily",
  "metrics": {
    "tme": {
      "value": "2m 34s",
      "change": "-15% desde ontem",
      "changeType": "decrease"
    },
    "tms": {
      "value": "8m 12s", 
      "change": "+3% desde ontem",
      "changeType": "increase"
    },
    // ... outras métricas
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
*/
