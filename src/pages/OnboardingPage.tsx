import React, { useState } from "react";
import { UserProfile, Product } from "../types";
import {
  ArrowRight,
  Check,
  Plus,
  Upload,
  Key,
  FileText,
  SkipForward,
} from "lucide-react";

interface Props {
  onComplete: (
    profile: UserProfile,
    initialSelectedProducts: Product[]
  ) => void;
}

const STARTER_PRODUCTS_CATALOG: Product[] = [
  {
    id: "p1",
    name: "Батон нарезной",
    category: "Хлеб и выпечка",
    stock: 0,
    minStock: 5,
    dailyUsage: 2,
    unit: "шт",
  },
  {
    id: "p2",
    name: "Хлеб ржаной (буханка)",
    category: "Хлеб и выпечка",
    stock: 0,
    minStock: 5,
    dailyUsage: 2,
    unit: "шт",
  },
  {
    id: "p3",
    name: "Лаваш тонкий",
    category: "Хлеб и выпечка",
    stock: 0,
    minStock: 3,
    dailyUsage: 1,
    unit: "шт",
  },
  {
    id: "p6",
    name: "Лапша Роллтон в пакете",
    category: "Еда быстрого приготовления",
    stock: 0,
    minStock: 10,
    dailyUsage: 5,
    unit: "шт",
  },
  {
    id: "p7",
    name: "Лапша Доширак в лотке",
    category: "Еда быстрого приготовления",
    stock: 0,
    minStock: 10,
    dailyUsage: 5,
    unit: "шт",
  },
  {
    id: "p11",
    name: "Чипсы картофельные Lays",
    category: "Снеки и чипсы",
    stock: 0,
    minStock: 10,
    dailyUsage: 4,
    unit: "шт",
  },
  {
    id: "p12",
    name: "Сухарики ржаные",
    category: "Снеки и чипсы",
    stock: 0,
    minStock: 15,
    dailyUsage: 6,
    unit: "шт",
  },
  {
    id: "p18",
    name: "Кофе растворимый (пакет 3в1)",
    category: "Горячие и холодные напитки",
    stock: 0,
    minStock: 30,
    dailyUsage: 10,
    unit: "шт",
  },
  {
    id: "p20",
    name: "Вода питьевая без газа 0.5л",
    category: "Горячие и холодные напитки",
    stock: 0,
    minStock: 12,
    dailyUsage: 6,
    unit: "шт",
  },
];

export const OnboardingPage: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // ШАГ 1: Данные аккаунта
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("Ритейл / Магазин");
  const [count, setCount] = useState<number | "">("");

  // ШАГ 2: Выбор товаров
  const [catalog, setCatalog] = useState<Product[]>(STARTER_PRODUCTS_CATALOG);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  // Добавление собственного товара
  const [addingCategory, setAddingCategory] = useState<string | null>(null);
  const [customName, setCustomName] = useState("");
  const [customUnit, setCustomUnit] = useState("шт");

  // ШАГ 3: Остатки
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [importMethod, setImportMethod] = useState<"manual" | "excel" | "pos">(
    "manual"
  );
  const [posKey, setPosKey] = useState("");

  const toggleProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddCustomProduct = (categoryName: string) => {
    if (!customName.trim()) return;

    const newProd: Product = {
      id: "custom-" + Date.now(),
      name: customName.trim(),
      category: categoryName,
      stock: 0,
      minStock: 5,
      dailyUsage: 1,
      unit: customUnit.trim() || "шт",
    };

    setCatalog((prev) => [newProd, ...prev]);
    setSelectedProductIds((prev) => [...prev, newProd.id]);

    setCustomName("");
    setCustomUnit("шт");
    setAddingCategory(null);
  };

  const handleQuantityChange = (id: string, value: string) => {
    const num = value === "" ? 0 : Math.max(0, Number(value));

    setQuantities((prev) => ({
      ...prev,
      [id]: num,
    }));
  };

  const finishOnboarding = (skipQuantities = false) => {
    const finalProducts = catalog
      .filter((p) => selectedProductIds.includes(p.id))
      .map((p) => ({
        ...p,
        stock: skipQuantities ? 0 : quantities[p.id] ?? 0,
      }));

    onComplete(
      {
        businessName: name || "Мой магазин",
        businessType: type,
        locationsCount: Number(count) || 1,
      },
      finalProducts
    );
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (!email) {
        alert("Пожалуйста, введите email!");
        return;
      }

      if (!password) {
        alert("Пожалуйста, придумайте пароль!");
        return;
      }

      if (!name.trim()) {
        alert("Пожалуйста, введите название заведения!");
        return;
      }

      if (!count || Number(count) < 1) {
        alert("Укажите количество точек!");
        return;
      }

      setStep(2);
      return;
    }

    if (step === 2) {
      if (selectedProductIds.length === 0) {
        alert("Выберите хотя бы один товар");
        return;
      }

      setStep(3);
      return;
    }

    finishOnboarding(false);
  };

  const categories = Array.from(new Set(catalog.map((p) => p.category)));

  const selectedProductsList = catalog.filter((p) =>
    selectedProductIds.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
        {/* ШАПКА */}
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Шаг {step} из 3 • Регистрация
            </span>

            <h2 className="text-2xl font-black mt-1">
              {step === 1 && "Создание аккаунта"}
              {step === 2 && "Выберите товары заведения"}
              {step === 3 && "Укажите текущие остатки"}
            </h2>
          </div>

          {step === 3 && (
            <button
              type="button"
              onClick={() => finishOnboarding(true)}
              className="text-xs font-bold text-slate-400 hover:text-amber-400 flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 transition"
            >
              <SkipForward size={14} />
              <span>Пропустить</span>
            </button>
          )}
        </div>

        <form onSubmit={handleNext} className="space-y-4">
          {/* ==================== ШАГ 1 ==================== */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Email (Логин)
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="example@domain.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Придумайте пароль
                </label>

                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Название заведения / магазина
                </label>

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Например: Мой Маркет"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Сфера деятельности
                </label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Ритейл / Магазин">
                    Ритейл / Магазин у дома
                  </option>

                  <option value="Кофейня / Ресторан">Кофейня / Ресторан</option>

                  <option value="Пекарня / Кондитерская">
                    Пекарня / Кондитерская
                  </option>

                  <option value="Другое">Другое</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Количество точек
                </label>

                <input
                  type="number"
                  min="1"
                  required
                  value={count}
                  onChange={(e) =>
                    setCount(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="1"
                />
              </div>
            </div>
          )}

          {/* ==================== ШАГ 2 ==================== */}
          {step === 2 && (
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
              {categories.map((cat) => {
                const categoryProducts = catalog.filter(
                  (p) => p.category === cat
                );

                const isAdding = addingCategory === cat;

                return (
                  <div key={cat} className="space-y-2">
                    <h3 className="text-sm font-bold text-emerald-400 border-b border-slate-800 pb-1">
                      {cat}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {categoryProducts.map((prod) => {
                        const isSelected = selectedProductIds.includes(prod.id);

                        const cardClasses = isSelected
                          ? "p-3 rounded-xl border cursor-pointer flex items-center justify-between transition bg-emerald-500/10 border-emerald-500 text-white"
                          : "p-3 rounded-xl border cursor-pointer flex items-center justify-between transition bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-600";

                        const boxClasses = isSelected
                          ? "w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border bg-emerald-500 border-emerald-500 text-slate-950"
                          : "w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border border-slate-600";

                        return (
                          <div
                            key={prod.id}
                            onClick={() => toggleProduct(prod.id)}
                            className={cardClasses}
                          >
                            <span className="font-medium text-xs truncate mr-2">
                              {prod.name}
                            </span>

                            <div className={boxClasses}>
                              {isSelected && (
                                <Check size={12} className="stroke-[3]" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {isAdding ? (
                      <div className="p-3 bg-slate-800/90 border border-slate-700 rounded-xl space-y-2 mt-2">
                        <p className="text-xs font-bold text-slate-300">
                          Новый товар в категорию "{cat}"
                        </p>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Название..."
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            className="w-2/3 p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                          />

                          <input
                            type="text"
                            placeholder="Ед. изм."
                            value={customUnit}
                            onChange={(e) => setCustomUnit(e.target.value)}
                            className="w-1/3 p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setAddingCategory(null)}
                            className="text-xs text-slate-400 px-3 py-1"
                          >
                            Отмена
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAddCustomProduct(cat)}
                            className="bg-emerald-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-lg"
                          >
                            Сохранить
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setAddingCategory(cat);
                          setCustomName("");
                        }}
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 mt-1 transition"
                      >
                        <Plus size={14} />
                        <span>Добавить еще товары</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ==================== ШАГ 3 ==================== */}
          {step === 3 && (
            <div className="space-y-4">
              {/* Выбор способа ввода */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-800 rounded-2xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setImportMethod("manual")}
                  className={
                    importMethod === "manual"
                      ? "py-2 rounded-xl transition flex items-center justify-center gap-1 bg-emerald-500 text-slate-950 shadow-md"
                      : "py-2 rounded-xl transition flex items-center justify-center gap-1 text-slate-400"
                  }
                >
                  <FileText size={14} />
                  Вручную
                </button>

                <button
                  type="button"
                  onClick={() => setImportMethod("excel")}
                  className={
                    importMethod === "excel"
                      ? "py-2 rounded-xl transition flex items-center justify-center gap-1 bg-emerald-500 text-slate-950 shadow-md"
                      : "py-2 rounded-xl transition flex items-center justify-center gap-1 text-slate-400"
                  }
                >
                  <Upload size={14} />
                  Excel / CSV
                </button>

                <button
                  type="button"
                  onClick={() => setImportMethod("pos")}
                  className={
                    importMethod === "pos"
                      ? "py-2 rounded-xl transition flex items-center justify-center gap-1 bg-emerald-500 text-slate-950 shadow-md"
                      : "py-2 rounded-xl transition flex items-center justify-center gap-1 text-slate-400"
                  }
                >
                  <Key size={14} />
                  Из кассы
                </button>
              </div>

              {/* ВРУЧНУЮ */}
              {importMethod === "manual" && (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {selectedProductsList.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl flex items-center justify-between gap-3"
                    >
                      <div>
                        <p className="font-bold text-xs text-white truncate">
                          {prod.name}
                        </p>

                        <p className="text-[10px] text-slate-400">
                          {prod.category}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          value={quantities[prod.id] ?? ""}
                          onChange={(e) =>
                            handleQuantityChange(prod.id, e.target.value)
                          }
                          className="w-20 p-2 bg-slate-900 border border-slate-600 rounded-lg text-xs text-right text-white font-bold outline-none focus:ring-1 focus:ring-emerald-500"
                        />

                        <span className="text-xs text-slate-400 w-8">
                          {prod.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* EXCEL / CSV */}
              {importMethod === "excel" && (
                <div className="p-6 border-2 border-dashed border-slate-700 rounded-2xl text-center space-y-3 bg-slate-800/40">
                  <Upload size={32} className="mx-auto text-emerald-400" />

                  <div>
                    <p className="text-xs font-bold text-slate-200">
                      Выберите файл .csv или .xlsx
                    </p>

                    <p className="text-[10px] text-slate-400 mt-1">
                      Файл должен содержать колонки: Название, Количество
                    </p>
                  </div>

                  <label className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer">
                    <span>Выбрать файл</span>

                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (!file) return;

                        const reader = new FileReader();

                        reader.onload = (event) => {
                          const text = event.target?.result as string;

                          if (!text) return;

                          const lines = text.split(/\r?\n/);
                          const newQuantities = {
                            ...quantities,
                          };

                          let updatedCount = 0;

                          lines.forEach((line) => {
                            const parts = line.split(/;|,/);

                            const name = parts[0];
                            const countStr = parts[1];

                            if (!name || !countStr) return;

                            const trimmedName = name.trim().toLowerCase();

                            const countNum = parseInt(countStr.trim(), 10);

                            const matchedProduct = selectedProductsList.find(
                              (p) => p.name.toLowerCase() === trimmedName
                            );

                            if (matchedProduct && !isNaN(countNum)) {
                              newQuantities[matchedProduct.id] = countNum;

                              updatedCount++;
                            }
                          });

                          setQuantities(newQuantities);

                          alert(
                            `Файл "${file.name}" успешно обработан! Обновлено товаров: ${updatedCount}`
                          );
                        };

                        reader.readAsText(file);
                      }}
                    />
                  </label>
                </div>
              )}

              {/* ИЗ КАССЫ */}
              {importMethod === "pos" && (
                <div className="space-y-3 p-4 bg-slate-800/60 rounded-2xl border border-slate-700">
                  <p className="text-xs font-bold text-slate-300">
                    Интеграция с кассой
                  </p>

                  <input
                    type="text"
                    value={posKey}
                    onChange={(e) => setPosKey(e.target.value)}
                    placeholder="Вставьте API-ключ..."
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              )}
            </div>
          )}

          {/* КНОПКА ДАЛЕЕ */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition"
            >
              {step === 3 ? "Завершить" : "Далее"}
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
