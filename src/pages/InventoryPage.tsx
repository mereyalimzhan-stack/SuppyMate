import React, { useState } from "react";
import { Product } from "../types";
import { Search, Plus, Minus } from "lucide-react";
import { Modal } from "../components/Modal";

interface Props {
  products: Product[];
  setProducts: (prods: Product[]) => void;
  onUpdateStock: (id: string, newStock: number) => void;
  addLog: (msg: string) => void;
  showToast: (msg: string) => void;
}

export const InventoryPage: React.FC<Props> = ({
  products,
  setProducts,
  onUpdateStock,
  addLog,
  showToast,
}) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State формы
  const [newName, setNewName] = useState("");
  const [newCat, setNewCat] = useState("Общее");
  const [newUnit, setNewUnit] = useState("шт");
  const [newStock, setNewStock] = useState(10);
  const [newMin, setNewMin] = useState(5);
  const [newUsage, setNewUsage] = useState(2);

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const getStatus = (stock: number, min: number) => {
    if (stock <= min / 2)
      return {
        label: "Критично",
        color: "bg-rose-100 text-rose-800 border-rose-200",
      };
    if (stock <= min)
      return {
        label: "На исходе",
        color: "bg-amber-100 text-amber-800 border-amber-200",
      };
    return {
      label: "Норма",
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    };
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: `p-${Date.now()}`,
      name: newName,
      category: newCat,
      unit: newUnit,
      stock: Number(newStock),
      minStock: Number(newMin),
      dailyUsage: Number(newUsage),
    };
    setProducts([...products, created]);
    addLog(`Добавлена позиция: ${newName}`);
    showToast(`Товар "${newName}" успешно внесен в базу`);
    setIsModalOpen(false);
    setNewName("");
  };

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Учёт остатков
          </h1>
          <p className="text-sm text-slate-500">
            Управление номенклатурой и оперативный контроль товаров
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-emerald-600/20 transition text-sm"
        >
          ＋ Добавить товар
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-3.5 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "Все категории" : c}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-4 pl-6">Наименование</th>
                <th className="p-4">Категория</th>
                <th className="p-4">Остаток</th>
                <th className="p-4">Быстрое изм.</th>
                <th className="p-4">Мин. порог</th>
                <th className="p-4">Хватит на</th>
                <th className="p-4 pr-6">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((prod) => {
                const status = getStatus(prod.stock, prod.minStock);
                const daysLeft =
                  prod.dailyUsage > 0
                    ? (prod.stock / prod.dailyUsage).toFixed(1)
                    : "∞";

                return (
                  <tr key={prod.id} className="hover:bg-slate-50/60 transition">
                    <td className="p-4 pl-6 font-bold text-slate-900">
                      {prod.name}
                    </td>
                    <td className="p-4 text-slate-500 font-medium">
                      {prod.category}
                    </td>
                    <td className="p-4 font-black text-slate-900">
                      {prod.stock} {prod.unit}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 w-fit">
                        <button
                          onClick={() => onUpdateStock(prod.id, prod.stock - 1)}
                          className="p-1.5 hover:bg-white rounded-lg text-slate-700 shadow-sm transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-bold text-xs">
                          {prod.stock}
                        </span>
                        <button
                          onClick={() => onUpdateStock(prod.id, prod.stock + 1)}
                          className="p-1.5 hover:bg-white rounded-lg text-slate-700 shadow-sm transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 font-medium">
                      {prod.minStock} {prod.unit}
                    </td>
                    <td className="p-4 text-slate-600 font-semibold">
                      ~{daysLeft} дн.
                    </td>
                    <td className="p-4 pr-6">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold border ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Добавить позицию"
      >
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Название товара
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl text-sm"
              placeholder="Например: Сахар тростниковый"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Категория
              </label>
              <input
                type="text"
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Ед. измерения
              </label>
              <input
                type="text"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Остаток
              </label>
              <input
                type="number"
                value={newStock}
                onChange={(e) => setNewStock(Number(e.target.value))}
                className="w-full p-3 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Мин. остаток
              </label>
              <input
                type="number"
                value={newMin}
                onChange={(e) => setNewMin(Number(e.target.value))}
                className="w-full p-3 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Расход/день
              </label>
              <input
                type="number"
                value={newUsage}
                onChange={(e) => setNewUsage(Number(e.target.value))}
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
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md"
            >
              Сохранить
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
