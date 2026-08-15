import React from "react";
import { Boxes, ShoppingCart, Truck, TrendingUp } from "lucide-react";

interface Props {
  setActiveTab: (tab: string) => void;
}

export const ToolsPage: React.FC<Props> = ({ setActiveTab }) => {
  const tools = [
    {
      id: "inventory",
      title: "Модуль остатков",
      desc: "Учёт товаров и установление мин. норм.",
      icon: Boxes,
    },
    {
      id: "autoorder",
      title: "Автозаказ",
      desc: "Автоматический состав заказа поставщику.",
      icon: ShoppingCart,
    },
    {
      id: "suppliers",
      title: "База поставщиков",
      desc: "Сравнение цен и показателей надежности.",
      icon: Truck,
    },
    {
      id: "forecast",
      title: "Анализ спроса",
      desc: "Прогнозирование расходов по дням.",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Инструменты
        </h1>
        <p className="text-sm text-slate-500">
          Доступ ко всем активным модулям системы
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{t.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{t.desc}</p>
              </div>
              <button
                onClick={() => setActiveTab(t.id)}
                className="mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition"
              >
                Перейти в модуль
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
