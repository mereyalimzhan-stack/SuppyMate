import React, { useState } from "react";
import { Supplier } from "../types";
import { ShieldCheck } from "lucide-react";
import { Modal } from "../components/Modal";

interface Props {
  suppliers: Supplier[];
  setSuppliers: (sups: Supplier[]) => void;
  showToast: (msg: string) => void;
  addLog: (msg: string) => void;
}

export const SuppliersPage: React.FC<Props> = ({
  suppliers,
  setSuppliers,
  showToast,
  addLog,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [deliveryDays, setDeliveryDays] = useState(1);
  const [reliability, setReliability] = useState(95);

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const newSup: Supplier = {
      id: `sup-${Date.now()}`,
      name,
      contact,
      deliveryDays: Number(deliveryDays),
      reliability: Number(reliability),
      delayRate: Math.max(0, 100 - Number(reliability)),
      price: 18500,
    };
    setSuppliers([...suppliers, newSup]);
    addLog(`Добавлен поставщик: ${name}`);
    showToast(`Поставщик "${name}" успешно добавлен`);
    setIsModalOpen(false);
    setName("");
  };

  const bestOption =
    suppliers.length > 0
      ? suppliers.reduce(
          (prev, curr) => (curr.reliability > prev.reliability ? curr : prev),
          suppliers[0]
        )
      : null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Поставщики
          </h1>
          <p className="text-sm text-slate-500">
            Сравнение условий, надежности и времени доставки
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-emerald-600/20 transition text-sm"
        >
          ＋ Добавить поставщика
        </button>
      </div>

      {bestOption && (
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck size={16} /> Лучший выбор по версии AI
            </div>
            <h3 className="text-xl font-black">{bestOption.name}</h3>
            <p className="text-xs text-slate-400">
              Надёжность выполнения заказов: {bestOption.reliability}% |
              Минимальный риск задержки
            </p>
          </div>
          <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-4 py-2.5 rounded-xl">
            Срок доставки: {bestOption.deliveryDays} дн.
          </span>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-4 pl-6">Поставщик</th>
              <th className="p-4">Контакты</th>
              <th className="p-4">Срок доставки</th>
              <th className="p-4">Надёжность</th>
              <th className="p-4 pr-6">Задержки</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {suppliers.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/60 transition">
                <td className="p-4 pl-6 font-bold text-slate-900">{s.name}</td>
                <td className="p-4 text-slate-600 font-medium">{s.contact}</td>
                <td className="p-4 text-slate-800 font-bold">
                  {s.deliveryDays} дн.
                </td>
                <td className="p-4 font-black text-emerald-600">
                  {s.reliability}%
                </td>
                <td className="p-4 pr-6 font-black text-rose-500">
                  {s.delayRate}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Новый поставщик"
      >
        <form onSubmit={handleAddSupplier} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Наименование компании
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Телефон / Email
            </label>
            <input
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Доставка (дни)
              </label>
              <input
                type="number"
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(Number(e.target.value))}
                className="w-full p-3 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Надёжность (%)
              </label>
              <input
                type="number"
                value={reliability}
                onChange={(e) => setReliability(Number(e.target.value))}
                className="w-full p-3 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-600"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md"
            >
              Сохранить
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
