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

function ChartCard({ title, children, note }: { title: string; children: React.ReactNode; note?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-baseline gap-2 mb-4">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {note && <span className="text-xs text-gray-400">{note}</span>}
      </div>
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

function ChannelRow({
  label,
  orders,
  revenue,
  users,
  avgOrders,
  ltv,
  accent,
}: {
  label: string;
  orders: number;
  revenue: number;
  users: number;
  avgOrders: number;
  ltv: number;
  accent: string;
}) {
  return (
    <tr className="border-t border-gray-100">
      <td className="py-3 pr-4">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${accent}`}>{label}</span>
      </td>
      <td className="py-3 pr-4 text-sm text-gray-800 font-medium">{fmt(orders)}</td>
      <td className="py-3 pr-4 text-sm text-gray-800">{(revenue / 1000000).toFixed(1)} млн ₽</td>
      <td className="py-3 pr-4 text-sm text-gray-800">{fmt(users)}</td>
      <td className="py-3 pr-4 text-sm text-gray-800">{avgOrders.toFixed(2)}×</td>
      <td className="py-3 text-sm font-medium text-gray-800">{fmt(ltv)} ₽</td>
    </tr>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Пекарня «Чегем» — Аналитика</h1>
          <p className="text-xs text-gray-400 mt-0.5">июнь 2025 — июнь 2026 · {fmt(metrics.totalOrders)} заказов · два канала</p>
        </div>
        <div className="flex gap-2">
          <span className="text-xs bg-blue-50 text-blue-700 font-medium px-3 py-1 rounded-full">Сайт</span>
          <span className="text-xs bg-sky-50 text-sky-700 font-medium px-3 py-1 rounded-full">iOS + Android</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">

        {/* Суммарные метрики */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MetricCard label="Всего заказов" value={fmt(metrics.totalOrders)} sub="сайт + приложение" />
          <MetricCard label="Выручка" value="35,1 млн ₽" sub="товары без доставки" />
          <MetricCard label="Средний чек" value={`${fmt(metrics.aov)} ₽`} sub="взвешенный по двум каналам" />
          <MetricCard label="Клиентов" value={fmt(metrics.uniqueUsers)} sub="сайт + приложение" />
          <MetricCard label="LTV · сайт" value={`${fmt(metrics.siteLtv)} ₽`} sub={`${metrics.siteAvgOrders}× заказа на клиента`} accent="red" />
          <MetricCard label="LTV · приложение" value={`${fmt(metrics.appLtv)} ₽`} sub={`${metrics.appAvgOrders}× заказа на клиента`} accent="red" />
          <MetricCard label="С акцией / промо" value={`${metrics.promoShare}%`} sub={`скидок на ${fmt(metrics.totalDiscount)} ₽ · прил.`} accent="red" />
          <MetricCard label="Retention 90д" value={`~${metrics.retention90d}%`} sub="медиана по когортам · прил." accent="red" />
        </div>

        {/* Сравнение каналов */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Сравнение каналов продаж</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  {["Канал", "Заказов", "Выручка", "Клиентов", "Заказов/кл.", "LTV"].map((h) => (
                    <th key={h} className="pb-2 pr-4 text-xs font-medium text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <ChannelRow
                  label="Сайт (Битрикс)"
                  orders={metrics.siteOrders}
                  revenue={metrics.siteRevenue}
                  users={metrics.siteUsers}
                  avgOrders={metrics.siteAvgOrders}
                  ltv={metrics.siteLtv}
                  accent="bg-blue-50 text-blue-700"
                />
                <ChannelRow
                  label="Приложение"
                  orders={metrics.appOrders}
                  revenue={metrics.appRevenue}
                  users={metrics.appUsers}
                  avgOrders={metrics.appAvgOrders}
                  ltv={metrics.appLtv}
                  accent="bg-sky-50 text-sky-700"
                />
                <tr className="border-t-2 border-gray-200">
                  <td className="py-3 pr-4">
                    <span className="text-xs font-semibold text-gray-600">Итого</span>
                  </td>
                  <td className="py-3 pr-4 text-sm font-semibold text-gray-900">{fmt(metrics.totalOrders)}</td>
                  <td className="py-3 pr-4 text-sm font-semibold text-gray-900">35,1 млн ₽</td>
                  <td className="py-3 pr-4 text-sm font-semibold text-gray-900">{fmt(metrics.uniqueUsers)}</td>
                  <td className="py-3 pr-4 text-sm text-gray-500">—</td>
                  <td className="py-3 text-sm font-semibold text-gray-900">~7 620 ₽</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Сайт — 87% заказов и выручки. Приложение имеет LTV на 12% выше за счёт лучшего retention: 1,26 заказа/клиента против 1,06 на сайте.
          </p>
        </div>

        {/* Помесячная динамика */}
        <ChartCard title="Заказы и средний чек по месяцам">
          <Legend items={[
            { color: "#3b82f6", label: "Сайт" },
            { color: "#93c5fd", label: "Приложение" },
            { color: "#f97316", label: "AOV ₽" },
          ]} />
          <MonthlyChart />
        </ChartCard>

        {/* Дни недели + часы */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ChartCard title="По дням недели" note="· приложение">
            <Legend items={[{ color: "#3b82f6", label: "Заказов" }, { color: "#10b981", label: "AOV ₽" }]} />
            <DayOfWeekChart />
          </ChartCard>
          <ChartCard title="По часам (когда принят заказ)" note="· приложение">
            <p className="text-xs text-gray-400 mb-3">Тёмно-синий — ≥70, средний — ≥40, светлый — менее 40</p>
            <HourlyChart />
          </ChartCard>
        </div>

        {/* Чеки + платформы */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ChartCard title="Распределение чеков" note="· приложение">
            <CheckDistributionChart />
          </ChartCard>
          <ChartCard title="Каналы продаж · доля заказов">
            <PlatformChart />
          </ChartCard>
        </div>

        {/* Топ товаров */}
        <ChartCard title="Топ-10 позиций (количество в заказах)" note="· приложение">
          <ul className="space-y-2">
            {topProducts.map((p) => {
              const pct = Math.round((p.qty / topProducts[0].qty) * 100);
              return (
                <li key={p.name} className="flex items-center gap-3 text-sm">
                  <span className="w-44 shrink-0 text-gray-700 truncate">{p.name}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-12 text-right text-xs text-gray-500">{p.qty}×</span>
                </li>
              );
            })}
          </ul>
        </ChartCard>

        {/* Когорты + топ клиентов */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ChartCard title="Когортный retention (90 дней)" note="· приложение">
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
          <ChartCard title="Топ-8 клиентов по LTV ₽" note="· приложение">
            <TopUsersChart />
          </ChartCard>
        </div>

        {/* Инсайты */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Ключевые инсайты</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                emoji: "🌐",
                title: "Сайт — основной канал",
                text: "87% заказов и выручки приходит с сайта (Битрикс). При этом LTV сайта ниже (7 525 ₽ vs 8 477 ₽ в приложении): сайтовый клиент делает в среднем 1,06 заказа, пользователь приложения — 1,26. Причина: в приложении есть push-уведомления, на сайте — ничего.",
              },
              {
                emoji: "🔁",
                title: "Retention — главная проблема обоих каналов",
                text: "Сайт: 96,4% клиентов заказали один раз. Приложение: 82%. В обоих каналах нет retention-механики. Каждый процентный пункт возврата на сайте = ~85 дополнительных заказов в год × 7 121 ₽ AOV = ~600 тыс. ₽.",
              },
              {
                emoji: "📅",
                title: "Событийный заказ, не импульсный",
                text: "47% заказов принято 9–12 утра (данные приложения). Пн–Вт дают AOV 7 400–7 800 ₽ против 5 300 ₽ в выходные. На сайте пик — март 2026 (479 заказов, 4,08 млн ₽). Аномалия: неделя 23 февраля 2026 — 183 заказа за 7 дней.",
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
