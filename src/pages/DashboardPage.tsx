import React from "react";
import { Product, Order, UserProfile } from "../types";
import {
  Boxes,
  AlertTriangle,
  ShoppingCart,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

interface Props {
  products: Product[];
  orders: Order[];
  profile: UserProfile;
  setActiveTab: (tab: string) => void;
}

export const DashboardPage: React.FC<Props> = ({
  products,
  orders,
  profile,
  setActiveTab,
}) => {
  const lowStockProducts = products.filter((p) => p.stock <= p.minStock);
  const activeOrdersCount = orders.filter(
    (o) =>
      o.status === "InTransit" || o.status === "Draft" || o.status === "Sent"
  ).length;

  const kpis = [
    {
      label: "Всего позиций",
      value: products.length,
      icon: Boxes,
      color: "text-slate-900",
      bg: "bg-slate-100",
    },
    {
      label: "Заканчивается",
      value: lowStockProducts.length,
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Заказы в пути",
      value: activeOrdersCount,
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Экономия за месяц",
      value: "24 800 ₸",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-slate-900/10 border border-slate-800">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            Оперативная сводка
          </span>
          <h1 className="text-3xl font-black mt-2 tracking-tight">
            Панель управления
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {profile.businessName} • {profile.businessType} (
            {profile.locationsCount} точки)
          </p>
        </div>
        <button
          onClick={() => setActiveTab("autoorder")}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 group"
        >
          <span>Сформировать автозаказ</span>
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {kpi.label}
                </span>
                <div
                  className={
                    "p-2.5 rounded-2xl border border-slate-200 " +
                    kpi.bg +
                    " " +
                    kpi.color
                  }
                >
                  <Icon size={20} />
                </div>
              </div>
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {kpi.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Smart Alert Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Умные уведомления</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {lowStockProducts.slice(0, 2).map((prod) => (
            <div
              key={prod.id}
              className="bg-amber-50/70 border border-amber-200/80 p-6 rounded-3xl flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="bg-amber-200/80 text-amber-900 text-xs font-black px-3 py-1 rounded-lg uppercase">
                    Дефицит
                  </span>
                  <span className="text-xs font-bold text-amber-700">
                    Остаток: {prod.stock} {prod.unit}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mt-4">
                  {prod.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Норма: {prod.minStock} {prod.unit} | Средний расход:{" "}
                  {prod.dailyUsage} {prod.unit}/день
                </p>
              </div>
              <button
                onClick={() => setActiveTab("autoorder")}
                className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition"
              >
                Пополнить запасы
              </button>
            </div>
          ))}

          <div className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col justify-between shadow-xl shadow-slate-900/10">
            <div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-lg uppercase">
                AI Аналитика
              </span>
              <h3 className="font-bold text-white text-lg mt-4">
                Оптимизация поставок
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Поставщик CoffeePro показывает наибольшую надежность (98%).
                Рекомендуем объединять закупки у него.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("suppliers")}
              className="mt-6 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-3 rounded-xl transition"
            >
              Сравнить поставщиков
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
