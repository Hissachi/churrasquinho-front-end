"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

export function DashboardCharts({ data }) {
  const topProdutos = data?.top_produtos || [];

  const formatted = topProdutos.map((item) => ({
    nome: item.produto.nome,
    total: Number(item.total),
    estoque: item.produto.quantidade,
    valor: Number(item.produto.preco) * item.produto.quantidade,
  }));

  const pieData = formatted.map((item) => ({
    name: item.nome,
    value: item.valor,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      <Card>
        <CardHeader>
          <CardTitle>Produtos mais movimentados</CardTitle>
        </CardHeader>

        <CardContent className="h-72">
          {formatted.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Sem movimentações ainda
            </p>
          ) : (
            <ResponsiveContainer>
              <BarChart data={formatted}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="nome" />
                <YAxis />

                <Tooltip />

                <Bar dataKey="total" radius={[6, 6, 0, 0]} fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição do valor em estoque</CardTitle>
        </CardHeader>

        <CardContent className="h-72">
          {pieData.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Sem dados
            </p>
          ) : (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

    </div>
  );
}