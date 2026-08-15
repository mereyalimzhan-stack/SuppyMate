import React, { useState } from "react";
import { Product, Supplier, Order } from "../types";
import { ArrowRight } from "lucide-react";

interface Props {
  products: Product[];
  suppliers: Supplier[];
  onCreateOrder: (order: Order) => void;
  setActiveTab: (tab: string) => void;
}

export const AutoOrdersPage: React.FC<Props> = ({
  products,
  suppliers,
  onCreateOrder,
  setActiveTab,
}) => {
  const needsRestock = products.filter((p) => p.stock <= p.minStock);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    needsRestock.map((p) => p.id)
  );
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    needsRestock.forEach((p) => {
      init[p.id] = p.minStock * 2 - p.stock;
    });
    return init;
  });
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>(
    suppliers[0]?.id || "sup-1"
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleQuantityChange = (id: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, qty) }));
  };

  const selectedSupplier =
    suppliers.find((s) => s.id === selectedSupplierId) || suppliers[0];
  const unitPriceAvg = 1200;
  const totalAmount = selectedIds.reduce(
    (sum, id) => sum + (quantities[id] || 10) * unitPriceAvg,
    0
  );

  const handleSubmitOrder = () => {
    if (selectedIds.length === 0) return;

    const items = selectedIds.map((id) => {
      const p = products.find((prod) => prod.id === id)!;
      return {
        productId: p.id,
        productName: p.name,
        quantity: quantities[id] || 10,
        unit: p.unit,
        unitPrice: unitPriceAvg,
      };
    });

    const newOrder: Order = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      supplierId: selectedSupplier.id,
      supplierName: selectedSupplier.name,
      items,
      total: totalAmount,
      date: new Date().toLocaleDateString("ru-RU"),
      status: "Sent",
    };

    onCreateOrder(newOrder);
    setActiveTab("orders");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Модуль автозаказов
        </h1>
        <p className="text-sm text-slate-500">
          Автоматический расчет объемов пополнения на основе текущих остатков
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900">Товары к пополнению</h3>

            {needsRestock.length === 0 ? (
              <div className="p-8 text-center text-slate-500 font-medium">
                Запасы всех товаров в норме!
              </div>
            ) : (
              needsRestock.map((prod) => {
                const isSelected = selectedIds.includes(prod.id);
                return (
                  <div
                    key={prod.id}
                    className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50/40"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(prod.id)}
                        className="w-5 h-5 text-emerald-600 rounded-lg focus:ring-emerald-500"
                      />
                      <div>
                        <p className="font-bold text-slate-900 text-sm">
                          {prod.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          Остаток:{" "}
                          <strong className="text-rose-600">
                            {prod.stock} {prod.unit}
                          </strong>{" "}
                          | Норма: {prod.minStock} {prod.unit}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">
                        Кол-во:
                      </span>
                      <input
                        type="number"
                        value={quantities[prod.id] || 10}
                        onChange={(e) =>
                          handleQuantityChange(prod.id, Number(e.target.value))
                        }
                        className="w-20 p-2 border border-slate-200 rounded-xl text-sm font-bold text-center"
                      />
                      <span className="text-xs font-semibold text-slate-600">
                        {prod.unit}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-5 h-fit">
          <h3 className="font-bold text-slate-900 text-lg">Сводка поставки</h3>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Выберите поставщика
            </label>
            <select
              value={selectedSupplierId}
              onChange={(e) => setSelectedSupplierId(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 bg-white"
            >
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.deliveryDays} дн.)
                </option>
              ))}
            </select>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Позиций выбрано:</span>
              <strong className="text-slate-900">{selectedIds.length}</strong>
            </div>
            <div className="flex justify-between text-lg font-black text-slate-900 pt-3 border-t border-slate-100">
              <span>Итого:</span>
              <span className="text-emerald-600">
                {totalAmount.toLocaleString("ru-RU")} ₸
              </span>
            </div>
          </div>

          <button
            disabled={selectedIds.length === 0}
            onClick={handleSubmitOrder}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
          >
            <span>Отправить заказ</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
