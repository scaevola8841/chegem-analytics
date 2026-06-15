"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Chart, Bar } from "react-chartjs-2";
import { byDayOfWeek, byHour } from "@/app/data/analytics";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip);

const gridColor = "#f3f4f6";
const baseOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
} as const;

export function DayOfWeekChart() {
  return (
    <div style={{ position: "relative", height: 200 }}>
      <Chart
        type="bar"
        data={{
          labels: byDayOfWeek.map((d) => d.day),
          datasets: [
            {
              type: "bar" as const,
              label: "Заказов",
              data: byDayOfWeek.map((d) => d.orders),
              backgroundColor: "#3b82f6",
              borderRadius: 4,
              yAxisID: "y",
            },
            {
              type: "line" as const,
              label: "AOV ₽",
              data: byDayOfWeek.map((d) => d.aov),
              borderColor: "#10b981",
              backgroundColor: "transparent",
              borderWidth: 2,
              pointRadius: 3,
              tension: 0.3,
              yAxisID: "y2",
            },
          ],
        }}
        options={{
          ...baseOpts,
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11 } } },
            y: { grid: { color: gridColor }, ticks: { font: { size: 11 } } },
            y2: {
              grid: { display: false },
              position: "right",
              ticks: { callback: (v) => `${(Number(v) / 1000).toFixed(1)}к`, font: { size: 11 } },
            },
          },
        }}
      />
    </div>
  );
}

export function HourlyChart() {
  return (
    <div style={{ position: "relative", height: 200 }}>
      <Bar
        data={{
          labels: byHour.map((d) => d.hour + ":00"),
          datasets: [
            {
              label: "Заказов",
              data: byHour.map((d) => d.orders),
              backgroundColor: byHour.map((d) =>
                d.orders >= 70 ? "#3b82f6" : d.orders >= 40 ? "#93c5fd" : "#dbeafe"
              ),
              borderRadius: 3,
            },
          ],
        }}
        options={{
          ...baseOpts,
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            y: { grid: { color: gridColor }, ticks: { font: { size: 11 } } },
          },
        }}
      />
    </div>
  );
}
