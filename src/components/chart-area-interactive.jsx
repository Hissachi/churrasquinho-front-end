"use client";

import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useDashboard } from "@/hooks/useDashboard";

export function ChartAreaInteractive() {
  const { data, isLoading } = useDashboard();

  if (isLoading) return <p>Carregando gráfico...</p>;

  const movimentacoes = data?.movimentacoes_hoje ?? [];

  const entradas = Number(
    movimentacoes.find((m) => m.tipo === "entrada")?.total ?? 0
  );

  const saidas = Number(
    movimentacoes.find((m) => m.tipo === "saida")?.total ?? 0
  );

  // 🔥 estrutura adaptada para Recharts
  const chartData = [
    {
      name: "Hoje",
      entradas,
      saidas,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Movimentações do Dia</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="entradas"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.2}
            />

            <Area
              type="monotone"
              dataKey="saidas"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}