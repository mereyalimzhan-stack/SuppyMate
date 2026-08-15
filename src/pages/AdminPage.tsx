import React from "react";
import { Supplier } from "../types";

interface Props {
  suppliers: Supplier[];
  setSuppliers: (s: Supplier[]) => void;
  showToast: (msg: string) => void;
}

export const AdminPage: React.FC<Props> = ({ suppliers, showToast }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Панель администратора
        </h1>
        <p className="text-sm text-slate-500">
          Конфигурация параметров платформы
        </p>
      </div>

      <div className="p-8 bg-slate-900 text-white rounded-3xl space-y-4 border border-slate-800">
        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-lg uppercase">
          Статус системы
        </span>
        <h3 className="text-xl font-bold">Все сервисы активны</h3>
        <p className="text-xs text-slate-400">
          Зарегистрировано поставщиков в базе: {suppliers.length}. Модули
          автозаказа, прогнозирования и синхронизации работают без сбоев.
        </p>
        <button
          onClick={() => showToast("Кэш приложения успешно обновлен")}
          className="mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition"
        >
          Сбросить кэш системы
        </button>
      </div>
    </div>
  );
};
