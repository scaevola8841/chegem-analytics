export const metrics = {
  // Суммарно по двум каналам
  totalOrders:   4968,
  totalRevenue:  35119297,
  aov:           7073,
  uniqueUsers:   4604,

  // Сайт (Битрикс)
  siteOrders:    4319,
  siteRevenue:   30753647,
  siteAov:       7121,
  siteUsers:     4087,
  siteReturning: 148,
  siteReturnRate: 3.6,
  siteAvgOrders: 1.06,
  siteLtv:       7525,
  siteBelowMin:  496,
  siteBelowMinPct: 11.5,

  // Приложение (iOS + Android)
  appOrders:    649,
  appRevenue:   4365650,
  appAov:       6727,
  appUsers:     517,
  appReturning: 93,
  appReturnRate: 18,
  appAvgOrders: 1.26,
  appLtv:       8477,
  appBelowMin:  98,
  appBelowMinPct: 15.1,

  // Метрики приложения (есть только в app-данных)
  ordersWithPromo:    282,
  promoShare:         43.5,
  totalDiscount:      150273,
  retention90d:       15,
  medianInterOrderDays: 23,
  avgInterOrderDays:  52,
};

// Помесячная динамика — оба канала
export const monthlyData = [
  { month: "Июн '25", appOrders: 18,  siteOrders: 351, aov: 5917 },
  { month: "Июл '25", appOrders: 38,  siteOrders: 299, aov: 6450 },
  { month: "Авг '25", appOrders: 56,  siteOrders: 266, aov: 6000 },
  { month: "Сен '25", appOrders: 74,  siteOrders: 367, aov: 6422 },
  { month: "Окт '25", appOrders: 78,  siteOrders: 369, aov: 6934 },
  { month: "Ноя '25", appOrders: 63,  siteOrders: 352, aov: 6556 },
  { month: "Дек '25", appOrders: 50,  siteOrders: 397, aov: 7074 },
  { month: "Янв '26", appOrders: 43,  siteOrders: 306, aov: 7681 },
  { month: "Фев '26", appOrders: 67,  siteOrders: 427, aov: 8429 },
  { month: "Мар '26", appOrders: 50,  siteOrders: 479, aov: 8524 },
  { month: "Апр '26", appOrders: 52,  siteOrders: 324, aov: 7184 },
  { month: "Май '26", appOrders: 45,  siteOrders: 337, aov: 7246 },
  { month: "Июн '26", appOrders: 15,  siteOrders: 45,  aov: 7072 },
];

// Каналы — реальная разбивка с учётом сайта
export const platforms = [
  { name: "Сайт",            count: 4319, pct: 86.9 },
  { name: "iOS (прил.)",     count: 372,  pct: 7.5  },
  { name: "Android (прил.)", count: 270,  pct: 5.4  },
  { name: "Web (прил.)",     count: 7,    pct: 0.1  },
];

// Поведенческие данные — только из приложения
export const byDayOfWeek = [
  { day: "Пн", orders: 127, aov: 7458 },
  { day: "Вт", orders: 120, aov: 7796 },
  { day: "Ср", orders: 95,  aov: 6553 },
  { day: "Чт", orders: 92,  aov: 7083 },
  { day: "Пт", orders: 100, aov: 5754 },
  { day: "Сб", orders: 50,  aov: 5345 },
  { day: "Вс", orders: 65,  aov: 5633 },
];

export const byHour = [
  { hour: "0",  orders: 4  },
  { hour: "6",  orders: 8  },
  { hour: "7",  orders: 19 },
  { hour: "8",  orders: 28 },
  { hour: "9",  orders: 84 },
  { hour: "10", orders: 85 },
  { hour: "11", orders: 72 },
  { hour: "12", orders: 69 },
  { hour: "13", orders: 47 },
  { hour: "14", orders: 43 },
  { hour: "15", orders: 40 },
  { hour: "16", orders: 31 },
  { hour: "17", orders: 42 },
  { hour: "18", orders: 24 },
  { hour: "19", orders: 12 },
  { hour: "20", orders: 9  },
  { hour: "21", orders: 12 },
  { hour: "22", orders: 10 },
  { hour: "23", orders: 8  },
];

export const checkDistribution = [
  { range: "до 3 500 ₽",     count: 98,  pct: 15.1 },
  { range: "3 500–5 000 ₽",  count: 159, pct: 24.5 },
  { range: "5 000–7 500 ₽",  count: 203, pct: 31.3 },
  { range: "7 500–10 000 ₽", count: 91,  pct: 14.0 },
  { range: "10 000–15 000 ₽",count: 67,  pct: 10.3 },
  { range: "15 000+ ₽",      count: 31,  pct: 4.8  },
];

export const topProducts = [
  { name: "Традиционный с мясом",   qty: 496 },
  { name: "Жульен",                  qty: 210 },
  { name: "Картофель и сыр",         qty: 168 },
  { name: "Пирог с сыром",           qty: 156 },
  { name: "Творог и малина",         qty: 148 },
  { name: "Горбуша",                 qty: 123 },
  { name: "Сыр и шпинат",            qty: 114 },
  { name: "Княжеский",               qty: 112 },
  { name: "Курица и сыр",            qty: 111 },
  { name: "Морс чёрная смородина",   qty: 62  },
];

export const cohortRetention = [
  { cohort: "Июн '25", size: 18, ret90: 22 },
  { cohort: "Июл '25", size: 36, ret90: 19 },
  { cohort: "Авг '25", size: 46, ret90: 22 },
  { cohort: "Сен '25", size: 56, ret90: 16 },
  { cohort: "Окт '25", size: 62, ret90: 10 },
  { cohort: "Ноя '25", size: 55, ret90: 9  },
  { cohort: "Дек '25", size: 39, ret90: 15 },
  { cohort: "Янв '26", size: 32, ret90: 3  },
  { cohort: "Фев '26", size: 54, ret90: 13 },
  { cohort: "Мар '26", size: 37, ret90: 11 },
];

export const topUsers = [
  { name: "Даниил",    ordersInSet: 21, lifetimeOrders: 28, ltv: 109202 },
  { name: "Ольга В.",  ordersInSet: 6,  lifetimeOrders: 6,  ltv: 94079  },
  { name: "Регина",    ordersInSet: 4,  lifetimeOrders: 4,  ltv: 51592  },
  { name: "Марина",    ordersInSet: 3,  lifetimeOrders: 3,  ltv: 39217  },
  { name: "Анастасия", ordersInSet: 4,  lifetimeOrders: 4,  ltv: 36820  },
  { name: "Степан",    ordersInSet: 7,  lifetimeOrders: 7,  ltv: 32548  },
  { name: "Олег",      ordersInSet: 3,  lifetimeOrders: 3,  ltv: 33248  },
  { name: "Анара",     ordersInSet: 7,  lifetimeOrders: 7,  ltv: 28966  },
];
