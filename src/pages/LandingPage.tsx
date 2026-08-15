import React from "react";
import { Boxes, TrendingUp, Zap, LogIn } from "lucide-react";

interface Props {
  onStart: () => void; // Регистрация / Онбординг
  onLogin?: () => void; // Вход
}

// Вынесли массив за пределы компонента, чтобы избежать ошибок синтаксиса в JSX
const FEATURES = [
  {
    icon: Boxes,
    title: "Учёт остатков",
    desc: "Автоматическое отслеживание порога критических запасов",
  },
  {
    icon: Zap,
    title: "Автозаказы",
    desc: "Сборка заявки поставщикам в 1 клик на основе аналитики",
  },
  {
    icon: TrendingUp,
    title: "Прогноз спроса",
    desc: "Анализ трендов потребления с помощью смарт-алгоритмов",
  },
];

export const LandingPage: React.FC<Props> = ({ onStart, onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 md:p-12">
      {/* Шапка */}
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xl">
            S
          </div>
          <span className="font-black text-xl tracking-tight">SupplyMate</span>
        </div>

        {/* Кнопки входа и регистрации в шапке */}
        <div className="flex items-center gap-3">
          {onLogin && (
            <button
              onClick={onLogin}
              className="text-xs font-bold text-slate-300 hover:text-white transition px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 flex items-center gap-1.5"
            >
              <LogIn size={14} />
              <span>Войти</span>
            </button>
          )}

          <button
            onClick={onStart}
            className="text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2.5 rounded-xl transition uppercase tracking-wider"
          >
            Регистрация
          </button>
        </div>
      </div>

      {/* Главный блок */}
      <div className="max-w-4xl mx-auto w-full my-12 text-center space-y-6">
        <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
          Умное управление запасами
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
          Автоматизируйте закупки и забывайте о дефицитах
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
          SupplyMate прогнозирует расход товаров, сам рассчитывает объем
          автозаказа и сравнивает лучших поставщиков за секунды.
        </p>

        {/* Кнопка входа в аккаунт */}
        {onLogin && (
          <div className="pt-4 flex justify-center">
            <button
              onClick={onLogin}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              <span>Войти в аккаунт</span>
            </button>
          </div>
        )}
      </div>

      {/* Преимущества */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-900">
        {FEATURES.map((feat, idx) => {
          const IconComponent = feat.icon;
          return (
            <div
              key={idx}
              className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3"
            >
              <IconComponent className="text-emerald-400" size={24} />
              <h3 className="font-bold text-white text-base">{feat.title}</h3>
              <p className="text-xs text-slate-400">{feat.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
