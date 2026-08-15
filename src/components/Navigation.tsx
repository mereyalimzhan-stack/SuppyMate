import React from "react";
import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  Truck,
  TrendingUp,
  History,
  Wrench,
  User,
  Shield,
} from "lucide-react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lowStockCount: number;
}

export const Navigation: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  lowStockCount,
}) => {
  const navItems = [
    { id: "dashboard", label: "Главный экран", icon: LayoutDashboard },
    {
      id: "inventory",
      label: "Учёт остатков",
      icon: Boxes,
      badge: lowStockCount > 0 ? lowStockCount : null,
    },
    { id: "autoorder", label: "Автозаказ", icon: ShoppingCart },
    { id: "suppliers", label: "Поставщики", icon: Truck },
    { id: "forecast", label: "Прогноз спроса", icon: TrendingUp },
    { id: "orders", label: "История заказов", icon: History },
    { id: "tools", label: "Инструменты", icon: Wrench },
    { id: "profile", label: "Профиль", icon: User },
    { id: "admin", label: "Админка", icon: Shield },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 text-slate-300 p-5 flex flex-col justify-between shrink-0">
      <div className="space-y-8">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20">
            S
          </div>
          <div>
            <span className="font-black text-lg text-white tracking-tight block">
              SupplyMate
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
              Smart ERP Pro
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm"
                    : "hover:bg-slate-800/60 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={19}
                    className={isActive ? "text-emerald-400" : "text-slate-400"}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs px-2 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex justify-between items-center px-2">
        <span>
          Статус:{" "}
          <strong className="text-emerald-400 font-normal">Онлайн</strong>
        </span>
        <span>v2.4.0</span>
      </div>
    </aside>
  );
};
