import React, { useState } from "react";
import { Bell, Search, User, X } from "lucide-react";

interface Props {
  title: string;
  businessName: string;
  setActiveTab: (tab: string) => void;
  lowStockCount: number;
}

export const Header: React.FC<Props> = ({
  title,
  businessName,
  setActiveTab,
  lowStockCount,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between shadow-xs relative">
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          {title}
        </h2>
        <p className="text-xs text-slate-500">{businessName}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search
            size={16}
            className="absolute left-3 top-2.5 text-slate-400"
          />
          <input
            type="text"
            placeholder="Быстрый поиск..."
            className="pl-9 pr-4 py-2 bg-slate-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 transition-all"
          />
        </div>

        {/* Уведомления */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 transition relative"
          >
            <Bell size={18} />
            {lowStockCount > 0 && (
              <>
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
              </>
            )}
          </button>

          {/* Выпадающий список уведомлений */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-50">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-3">
                <span className="font-bold text-xs uppercase text-slate-700">
                  Уведомления
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-2">
                {lowStockCount > 0 ? (
                  <div
                    onClick={() => {
                      setActiveTab("inventory");
                      setShowNotifications(false);
                    }}
                    className="p-2.5 bg-rose-50 border border-rose-100 rounded-xl cursor-pointer hover:bg-rose-100 transition"
                  >
                    <p className="text-xs font-bold text-rose-800">
                      Внимание: дефицит!
                    </p>
                    <p className="text-[11px] text-rose-600 mt-0.5">
                      Заканчивается товаров: {lowStockCount} шт. Нажмите для
                      просмотра.
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 text-center py-2">
                    Все остатки в норме
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Кнопка Профиля с переходом */}
        <button
          onClick={() => setActiveTab("profile")}
          title="Открыть профиль"
          className="flex items-center gap-2 pl-2 border-l border-slate-200 hover:opacity-80 transition"
        >
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs shadow-sm">
            <User size={16} />
          </div>
        </button>
      </div>
    </header>
  );
};
