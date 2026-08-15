import React, { useState } from "react";
import { Store, LogIn, ArrowLeft } from "lucide-react";

interface Props {
  onLoginSuccess: () => void;
  onGoToRegister: () => void;
  onGoToLanding: () => void;
}

export const LoginPage: React.FC<Props> = ({
  onLoginSuccess,
  onGoToRegister,
  onGoToLanding,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Успешный вход -> переходим в главное приложение "app"
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4">
      {/* Кнопка назад на Landing */}
      <button
        onClick={onGoToLanding}
        className="absolute top-6 left-6 text-xs text-slate-400 hover:text-white flex items-center gap-1.5 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 transition"
      >
        <ArrowLeft size={14} />
        <span>На главную</span>
      </button>

      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
            <Store size={28} />
          </div>
          <h1 className="text-2xl font-black">Войти в SupplyMate</h1>
          <p className="text-xs text-slate-400">
            Введите логин и пароль для доступа к системе
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
              Email / Логин
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
              Пароль
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            <span>Войти в аккаунт</span>
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            Еще нет аккаунта?{" "}
            <button
              type="button"
              onClick={onGoToRegister}
              className="text-emerald-400 font-bold hover:underline ml-1"
            >
              Зарегистрироваться
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
