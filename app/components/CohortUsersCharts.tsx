"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { cohortRetention, topUsers } from "@/app/data/analytics";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const gridColor = "#f3f4f6";

export function CohortChart() {
  return (
    <div style={{ position: "relative", height: 220 }}>
      <Bar
        data={{
          labels: cohortRetention.map((d) => d.cohort),
          datasets: [
            {
              label: "Retention 90д, %",
              data: cohortRetention.map((d) => d.ret90),
              backgroundColor: cohortRetention.map((d) =>
                d.ret90 >= 20 ? "#10b981" : d.ret90 >= 12 ? "#3b82f6" : d.ret90 >= 8 ? "#f97316" : "#ef4444"
              ),
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
            y: {
              grid: { color: gridColor },
              max: 28,
              ticks: { callback: (v) => `${v}%`, font: { size: 11 } },
            },
          },
        }}
      />
    </div>
  );
}

export function TopUsersChart() {
  return (
    <div style={{ position: "relative", height: 220 }}>
      <Bar
        data={{
          labels: topUsers.map((u) => u.name),
          datasets: [
            {
              label: "LTV ₽",
              data: topUsers.map((u) => u.ltv),
              backgroundColor: "#8b5cf6",
              borderRadius: 4,
            },
          ],
        }}
        options={{
          indexAxis: "y" as const,
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { color: gridColor },
              ticks: { callback: (v) => `${Math.round(Number(v) / 1000)}к`, font: { size: 11 } },
            },
            y: { grid: { display: false }, ticks: { font: { size: 11 } } },
          },
        }}
      />
    </div>
  );
}
