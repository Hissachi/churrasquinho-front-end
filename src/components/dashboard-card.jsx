import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/hooks/useDashboard";

export function DashboardCards() {
  const { data, isLoading } = useDashboard();

  if (isLoading) return <p>Carregando...</p>;

  const resumo = data?.resumo || {};
  const desperdicio = data?.desperdicio || {};

  const entradas =
    data?.movimentacoes_hoje?.find((m) => m.tipo === "entrada")?.total || 0;

  const saidas =
    data?.movimentacoes_hoje?.find((m) => m.tipo === "saida")?.total || 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Estoque Total</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{Number(resumo.estoque_total)}</p>
          <p className="text-xs text-muted-foreground">Itens disponíveis</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Valor em Estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            R$ {Number(resumo.valor_estoque).toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">Valor total estimado</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Entradas Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-500">{entradas}</p>
          <p className="text-xs text-muted-foreground">Reposições</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Saídas Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-500">{saidas}</p>
          <p className="text-xs text-muted-foreground">Vendas/consumo</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Produtos em prejuízo</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-red-500 text-2xl font-bold">
            {data.kpis.produtos_prejuizo}
          </span>
          <p className="text-xs text-muted-foreground">Itens negativos</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Margem média</CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={
              data.kpis.margem_media < 0
                ? "text-red-500 text-2xl font-bold"
                : "text-green-600 text-2xl font-bold"
            }
          >
            {data.kpis.margem_media}%
          </span>
          <p className="text-xs text-muted-foreground">Margem de lucro média</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Desperdício Total</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-orange-500">
            {Number(desperdicio.total_kg || 0)} kg
          </p>
          <p className="text-xs text-muted-foreground">Peso descartado</p>
        </CardContent>
      </Card>
    </div>
  );
}
