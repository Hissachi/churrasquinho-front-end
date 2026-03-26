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
  const desperdicio = data?.desperdicio || {};

  const formatted = topProdutos.map((item) => ({
    nome: item.nome || "Sem nome",
    total: Number(item.total) || 0,
  }));

  const desperdicioOrigem = [
    { name: "Interno", value: desperdicio?.por_origem?.interno || 0 },
    { name: "Cliente", value: desperdicio?.por_origem?.cliente || 0 },
  ];

  const desperdicioTipo = [
    { name: "Comida pronta", value: desperdicio?.por_tipo?.comida_pronta || 0 },
    { name: "Insumo cru", value: desperdicio?.por_tipo?.insumo_cru || 0 },
    { name: "Embalagem", value: desperdicio?.por_tipo?.embalagem || 0 },
  ];

  const impacto = data?.impacto_financeiro || [];

  const impactoFormatado = impacto.map((item) => ({
    nome: item.nome || "Sem nome",
    valor: Number(item.valor) || 0,
  }));

  const pieData = impactoFormatado.map((item) => ({
    name: item.nome,
    value: item.valor,
  }));
console.log(data);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Produtos mais vendidos</CardTitle>
        </CardHeader>

        <CardContent className="h-72">
          {formatted.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Sem movimentações ainda
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formatted}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="nome" />
                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="total"
                  radius={[6, 6, 0, 0]}
                  fill="#3b82f6"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Impacto financeiro</CardTitle>
        </CardHeader>

        <CardContent className="h-72">
          {pieData.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Sem dados
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
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

      <Card>
        <CardHeader>
          <CardTitle>Desperdício por origem</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={desperdicioOrigem} dataKey="value" nameKey="name">
                {desperdicioOrigem.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Desperdício por tipo</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer>
            <BarChart data={desperdicioTipo}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
}

