"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TopProdutosList({ data }) {
  const produtos = data?.top_produtos || [];

  if (produtos.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ranking de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Sem dados ainda</p>
        </CardContent>
      </Card>
    );
  }

  const max = Math.max(...produtos.map((p) => Number(p.total)));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ranking de Movimentação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {produtos.map((item, index) => {
          const porcentagem = (Number(item.total) / max) * 100;

          return (
            <div key={item.produto_id}>
              <div className="flex justify-between text-sm">
                <span>{item.nome}</span>
                <span>{item.total}</span>
              </div>

              <div className="w-full h-2 bg-muted rounded">
                <div
                  className="h-2 bg-primary rounded"
                  style={{ width: `${porcentagem}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
