import MonthlyChart from "@/app/components/MonthlyChart";
import { DayOfWeekChart, HourlyChart } from "@/app/components/DayHourCharts";
import { CheckDistributionChart, PlatformChart } from "@/app/components/DistributionCharts";
import { CohortChart, TopUsersChart } from "@/app/components/CohortUsersCharts";
import AnalyticsReport from "@/app/components/AnalyticsReport";
import { metrics, topProducts } from "@/app/data/analytics";

function fmt(n: number) {
  return n.toLocaleString("ru-RU");
}

function MetricCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: "red" | "green";
}) {
  const accentClass =
    accent === "red"
      ? "text-red-600"
      : accent === "green"
      ? "text-emerald-600"
      : "text-gray-900";
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-1">
      <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</span>
      <span className={`text-2xl font-semibold ${accentClass}`}>{value}</span>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-sm font-medium text-gray-700 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Legend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <div className="flex gap-4 mb-3 flex-wrap">
      {items.map((i) => (
        <span key={i.label} className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: i.color }} />
          {i.label}
        </span>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Пекарня «Чегем» — Аналитика</h1>
          <p className="text-xs text-gray-400 mt-0.5">июнь 2025 — июнь 2026 · 649 заказов</p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-700 font-medium px-3 py-1 rounded-full">
          Приложение (iOS + Android)
        </span>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">

        {/* Метрики */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MetricCard label="Всего заказов" value={fmt(metrics.totalOrders)} sub="~12,5/нед" />
          <MetricCard label="Выручка" value="4,37 млн ₽" sub="товары без доставки" />
          <MetricCard label="Средний чек" value={`${fmt(metrics.aov)} ₽`} sub="медиана ~5 700 ₽" />
          <MetricCard label="Клиентов" value={fmt(metrics.uniqueUsers)} sub={`${metrics.returningUsers} вернулись`} />
          <MetricCard label="Новых клиентов" value={fmt(metrics.newUsers)} sub="82% всех пользователей" />
          <MetricCard label="Retention 90д" value={`~${metrics.retention90d}%`} sub="медиана по когортам" accent="red" />
          <MetricCard label="С акцией / промо" value={`${metrics.promoShare}%`} sub={`скидок на ${fmt(metrics.totalDiscount)} ₽`} accent="red" />
          <MetricCard label="Ниже минималки" value={`${metrics.belowMinimumShare}%`} sub={`${metrics.belowMinimum} заказов до 3 500 ₽`} accent="red" />
        </div>

        {/* Помесячная динамика */}
        <ChartCard title="Заказы и средний чек по месяцам">
          <Legend items={[{ color: "#3b82f6", label: "Заказов" }, { color: "#f97316", label: "AOV ₽" }]} />
          <MonthlyChart />
        </ChartCard>

        {/* Дни недели + часы */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ChartCard title="По дням недели">
            <Legend items={[{ color: "#3b82f6", label: "Заказов" }, { color: "#10b981", label: "AOV ₽" }]} />
            <DayOfWeekChart />
          </ChartCard>
          <ChartCard title="По часам (когда принят заказ)">
            <p className="text-xs text-gray-400 mb-3">Тёмно-синий — ≥70, средний — ≥40, светлый — менее 40</p>
            <HourlyChart />
          </ChartCard>
        </div>

        {/* Чеки + платформы */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ChartCard title="Распределение чеков">
            <CheckDistributionChart />
          </ChartCard>
          <ChartCard title="Платформы">
            <PlatformChart />
          </ChartCard>
        </div>

        {/* Топ товаров */}
        <ChartCard title="Топ-10 позиций (количество в заказах)">
          <ul className="space-y-2">
            {topProducts.map((p) => {
              const pct = Math.round((p.qty / topProducts[0].qty) * 100);
              return (
                <li key={p.name} className="flex items-center gap-3 text-sm">
                  <span className="w-44 shrink-0 text-gray-700 truncate">{p.name}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-xs text-gray-500">{p.qty}×</span>
                </li>
              );
            })}
          </ul>
        </ChartCard>

        {/* Когорты + топ клиентов */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ChartCard title="Когортный retention (90 дней)">
            <div className="flex gap-3 mb-3 flex-wrap text-xs text-gray-500">
              {[
                { color: "#10b981", label: "≥20%" },
                { color: "#3b82f6", label: "12–19%" },
                { color: "#f97316", label: "8–11%" },
                { color: "#ef4444", label: "<8%" },
              ].map((i) => (
                <span key={i.label} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: i.color }} />
                  {i.label}
                </span>
              ))}
            </div>
            <CohortChart />
          </ChartCard>
          <ChartCard title="Топ-8 клиентов по LTV ₽">
            <TopUsersChart />
          </ChartCard>
        </div>

        {/* Инсайты */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Ключевые инсайты</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                emoji: "📅",
                title: "Событийный заказ, не импульсный",
                text: "47% заказов принято 9–12 утра, доставка — через несколько часов или на следующий день. Пн–Вт дают AOV 7 400–7 800 ₽ против 5 300 ₽ в выходные. Заказывают на корпоративы и праздники.",
              },
              {
                emoji: "🔁",
                title: "Retention — главная проблема",
                text: "82% клиентов заказали только один раз. Когорта октября-ноября (самая большая) вернулась в 9–10% — промо на вход было, retention-механики не было. 150 тыс. ₽ скидок без удержания.",
              },
              {
                emoji: "📦",
                title: "Традиционный мясной — якорь",
                text: "496 штук — в 2,4× больше второго места (Жульен). Присутствует почти в каждом втором заказе. AOV первого заказа (6 837 ₽) лишь на 5% выше повторного (6 520 ₽).",
              },
            ].map((ins) => (
              <div key={ins.title} className="bg-gray-50 rounded-lg p-4">
                <p className="text-lg mb-1">{ins.emoji}</p>
                <p className="text-sm font-medium text-gray-800 mb-1">{ins.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{ins.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Аналитический отчёт */}
        <AnalyticsReport />

      </main>

      <footer className="text-center text-xs text-gray-400 py-6">
        Данные агрегированы · без персональных данных · пекарня «Чегем» 2025–2026
      </footer>
    </div>
  );
}
