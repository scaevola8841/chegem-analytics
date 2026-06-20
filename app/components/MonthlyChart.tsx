"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { monthlyData } from "@/app/data/analytics";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend);

export default function MonthlyChart() {
  return (
    <div style={{ position: "relative", height: 260 }}>
      <Chart
        type="bar"
        data={{
          labels: monthlyData.map((d) => d.month),
          datasets: [
            {
              type: "bar" as const,
              label: "Сайт",
              data: monthlyData.map((d) => d.siteOrders),
              backgroundColor: "#3b82f6",
              borderRadius: 3,
              stack: "orders",
              yAxisID: "y",
            },
            {
              type: "bar" as const,
              label: "Приложение",
              data: monthlyData.map((d) => d.appOrders),
              backgroundColor: "#93c5fd",
              borderRadius: 3,
              stack: "orders",
              yAxisID: "y",
            },
            {
              type: "line" as const,
              label: "AOV ₽",
              data: monthlyData.map((d) => d.aov),
              borderColor: "#f97316",
              backgroundColor: "transparent",
              borderWidth: 2,
              pointRadius: 3,
              tension: 0.3,
              yAxisID: "y2",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { stacked: true, grid: { display: false }, ticks: { font: { size: 11 } } },
            y: {
              stacked: true,
              grid: { color: "#f3f4f6" },
              position: "left",
              ticks: { stepSize: 100, font: { size: 11 } },
            },
            y2: {
              grid: { display: false },
              position: "right",
              ticks: { callback: (v) => `${Math.round(Number(v) / 1000)}к`, font: { size: 11 } },
            },
          },
        }}
      />
    </div>
  );
}
