"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { checkDistribution, platforms } from "@/app/data/analytics";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const gridColor = "#f3f4f6";

export function CheckDistributionChart() {
  return (
    <div style={{ position: "relative", height: 200 }}>
      <Bar
        data={{
          labels: checkDistribution.map((d) => d.range),
          datasets: [
            {
              label: "% заказов",
              data: checkDistribution.map((d) => d.pct),
              backgroundColor: ["#ef4444", "#f97316", "#3b82f6", "#10b981", "#8b5cf6", "#6b7280"],
              borderRadius: 4,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            y: { grid: { color: gridColor }, ticks: { callback: (v) => `${v}%`, font: { size: 11 } } },
          },
        }}
      />
    </div>
  );
}

export function PlatformChart() {
  return (
    <div style={{ position: "relative", height: 200 }}>
      <Doughnut
        data={{
          labels: platforms.map((p) => `${p.name} ${p.pct}%`),
          datasets: [
            {
              data: platforms.map((p) => p.count),
              backgroundColor: ["#3b82f6", "#10b981", "#6b7280"],
              borderWidth: 0,
              hoverOffset: 6,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: "62%",
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: { font: { size: 11 }, boxWidth: 10, padding: 8 },
            },
          },
        }}
      />
    </div>
  );
}
