import { Routes, Route } from "react-router-dom"

import DashboardPage from "@/app/dashboard/page"
import EstoquePage from "@/app/estoque/page"
import DesperdicioPage from "@/app/desperdicio/page"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function App() {
  return (
    <TooltipProvider>
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        <AppSidebar variant="inset" />

        <SidebarInset>
          <SiteHeader />

          <div className="flex flex-1 flex-col">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/estoque" element={<EstoquePage />} />
              <Route path="/desperdicio" element={<DesperdicioPage />} />
            </Routes>
          </div>

        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
