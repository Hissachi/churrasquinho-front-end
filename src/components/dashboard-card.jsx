import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/hooks/useDashboard";

export function DashboardCards() {
  const { data, isLoading } = useDashboard();

  if (isLoading) return <p>Carregando...</p>;

  const resumo = data?.resumo || {};

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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Entradas Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-500">{entradas}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Saídas Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-500">{saidas}</p>
        </CardContent>
      </Card>
    </div>
  );
}