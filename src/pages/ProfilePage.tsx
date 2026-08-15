import React from "react";
import { UserProfile, ActivityLog } from "../types";

interface Props {
  profile: UserProfile;
  productsCount: number;
  ordersCount: number;
  logs: ActivityLog[];
}

export const ProfilePage: React.FC<Props> = ({
  profile,
  productsCount,
  ordersCount,
  logs,
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Профиль компании
        </h1>
        <p className="text-sm text-slate-500">
          Информация о заведении и системные логи
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 text-sm">
          <h2 className="font-bold text-lg text-slate-900">
            Сведения о бизнесе
          </h2>
          <div className="space-y-2">
            <p className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Название:</span>
              <strong className="text-slate-900">{profile.businessName}</strong>
            </p>
            <p className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Тип:</span>
              <strong className="text-slate-900">{profile.businessType}</strong>
            </p>
            <p className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Количество точек:</span>
              <strong className="text-slate-900">
                {profile.locationsCount}
              </strong>
            </p>
            <p className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Активных товаров:</span>
              <strong className="text-slate-900">{productsCount}</strong>
            </p>
            <p className="flex justify-between">
              <span className="text-slate-500">Всего заказов:</span>
              <strong className="text-slate-900">{ordersCount}</strong>
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="font-bold text-lg text-slate-900">Журнал действий</h2>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {logs.map((l) => (
              <div
                key={l.id}
                className="text-xs p-3 bg-slate-50 rounded-xl flex justify-between items-center border border-slate-100"
              >
                <span className="font-medium text-slate-700">{l.action}</span>
                <span className="text-slate-400 text-[10px]">
                  {l.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
