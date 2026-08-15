import React from "react";
import { Order } from "../types";

interface Props {
  orders: Order[];
}

export const OrdersHistoryPage: React.FC<Props> = ({ orders }) => {
  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800">
            Доставлен
          </span>
        );
      case "InTransit":
        return (
          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-800">
            В пути
          </span>
        );
      case "Sent":
        return (
          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-800">
            Отправлен
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          История заказов
        </h1>
        <p className="text-sm text-slate-500">
          Журнал всех закупок и отслеживание статусов
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-4 pl-6">Заказ №</th>
              <th className="p-4">Поставщик</th>
              <th className="p-4">Товары</th>
              <th className="p-4">Сумма</th>
              <th className="p-4">Дата</th>
              <th className="p-4 pr-6">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50/60 transition">
                <td className="p-4 pl-6 font-black text-slate-900">#{o.id}</td>
                <td className="p-4 font-bold text-slate-800">
                  {o.supplierName}
                </td>
                <td className="p-4 text-slate-600">
                  {o.items
                    .map((i) => `${i.productName} (${i.quantity}${i.unit})`)
                    .join(", ")}
                </td>
                <td className="p-4 font-black text-slate-900">
                  {o.total.toLocaleString("ru-RU")} ₸
                </td>
                <td className="p-4 text-slate-500 font-medium">{o.date}</td>
                <td className="p-4 pr-6">{getStatusBadge(o.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
