"use client";

import { DashboardCards } from "@/components/dashboard-card";
import { ProdutosList } from "@/components/produtos-list";
import { DashboardCharts } from "@/components/dashboard-charts";
import { TopProdutosList } from "@/components/top-produtos-list";
import { useDashboard } from "@/hooks/useDashboard";

export default function Page() {
  const { data, isLoading } = useDashboard();

  if (isLoading) return <p>Carregando dashboard...</p>;

  return (
    <div className="flex flex-1 flex-col" class="pagina">
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        
        {/* KPIs */}
        <DashboardCards />

        {/* GRÁFICOS */}
        <DashboardCharts data={data} />

        {/* RANKING */}
        <TopProdutosList data={data} />

        {/* AÇÃO */}
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Movimentar estoque
          </h2>
          <ProdutosList />
        </div>

      </div>
    </div>
  );
}