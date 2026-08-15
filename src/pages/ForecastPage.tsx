import React from "react";
import { Product } from "../types";

interface Props {
  products: Product[];
}

export const ForecastPage: React.FC<Props> = ({ products }) => {
  const selectedProduct = products[0] || {
    name: "Молоко",
    stock: 8,
    dailyUsage: 4,
    unit: "л",
  };
  const daysUntilEmpty =
    selectedProduct.dailyUsage > 0
      ? (selectedProduct.stock / selectedProduct.dailyUsage).toFixed(1)
      : "∞";

  const weeklyDemand = [
    { day: "Пн", val: 3 },
    { day: "Вт", val: 4 },
    { day: "Ср", val: 4 },
    { day: "Чт", val: 5 },
    { day: "Пт", val: 7 },
    { day: "Сб", val: 9 },
    { day: "Вс", val: 6 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Прогноз спроса
        </h1>
        <p className="text-sm text-slate-500">
          Расчёт графика потребления с учётом пиковых дней
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">
            Потребление: {selectedProduct.name}
          </h2>
          <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold">
            Smart-Forecast
          </span>
        </div>

        <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-slate-100 pb-4">
          {weeklyDemand.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-slate-700">
                {d.val} {selectedProduct.unit}
              </span>
              <div
                className="w-full bg-emerald-500 rounded-t-xl transition-all duration-300 hover:bg-emerald-400"
                style={{ height: d.val * 16 + "px" }}
              ></div>
              <span className="text-xs font-bold text-slate-400">{d.day}</span>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-2xl">
            <span className="text-xs text-slate-400 font-bold uppercase">
              Расход / день
            </span>
            <p className="text-xl font-black text-slate-900 mt-1">
              {selectedProduct.dailyUsage} {selectedProduct.unit}
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl">
            <span className="text-xs text-slate-400 font-bold uppercase">
              Текущий запас
            </span>
            <p className="text-xl font-black text-slate-900 mt-1">
              {selectedProduct.stock} {selectedProduct.unit}
            </p>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
            <span className="text-xs text-amber-800 font-bold uppercase">
              Запаса хватит
            </span>
            <p className="text-xl font-black text-amber-900 mt-1">
              ~{daysUntilEmpty} дней
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
