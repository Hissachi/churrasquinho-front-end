import { Routes, Route } from "react-router-dom"
import DashboardPage from "./app/dashboard/page"
import EstoquePage from "./app/estoque/page"
// import ReciclagemPage from "./app/reciclagem/page"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/estoque" element={<EstoquePage />} />
      {/* <Route path="/reciclagem" element={<ReciclagemPage />} /> */}
    </Routes>
  )
}