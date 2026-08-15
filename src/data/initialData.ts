import { Product, Supplier, Order, UserProfile } from "../types";

export const initialProducts: Product[] = [
  {
    id: "p1",
    name: "Кофейные зерна (Arabica Premium)",
    category: "Напитки",
    unit: "кг",
    stock: 3,
    minStock: 10,
    dailyUsage: 2.5,
  },
  {
    id: "p2",
    name: "Молоко Ультрапастеризованное 3.2%",
    category: "Молочные продукты",
    unit: "л",
    stock: 8,
    minStock: 25,
    dailyUsage: 6,
  },
  {
    id: "p3",
    name: "Сироп Лесной Орех 1L",
    category: "Сиропы",
    unit: "бутылка",
    stock: 12,
    minStock: 5,
    dailyUsage: 0.8,
  },
  {
    id: "p4",
    name: "Крафтовые стаканы 350мл",
    category: "Упаковка",
    unit: "шт",
    stock: 120,
    minStock: 300,
    dailyUsage: 45,
  },
];

export const initialSuppliers: Supplier[] = [
  {
    id: "sup-1",
    name: "CoffeePro Logistics",
    contact: "+7 (701) 555-0199",
    deliveryDays: 1,
    reliability: 98,
    delayRate: 2,
    price: 18500,
  },
  {
    id: "sup-2",
    name: "Global Food Kazakhstan",
    contact: "+7 (702) 444-0288",
    deliveryDays: 2,
    reliability: 89,
    delayRate: 11,
    price: 16900,
  },
];

export const initialOrders: Order[] = [
  {
    id: "4092",
    supplierId: "sup-1",
    supplierName: "CoffeePro Logistics",
    items: [
      {
        productId: "p1",
        productName: "Кофейные зерна (Arabica Premium)",
        quantity: 15,
        unit: "кг",
        unitPrice: 1200,
      },
    ],
    total: 18000,
    date: "14.08.2026",
    status: "InTransit",
  },
];

export const initialProfile: UserProfile = {
  businessName: "Coffee & Chill Hub",
  businessType: "Кофейня / Пекарня",
  locationsCount: 3,
};
