import React, { useState } from "react";
import {
  initialProducts,
  initialSuppliers,
  initialOrders,
  initialProfile,
} from "./data/initialData";
import { Navigation } from "./components/Navigation";
import { Header } from "./components/Header";
import { Toast } from "./components/Toast";
import { LandingPage } from "./pages/LandingPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { LoginPage } from "./pages/LoginPage"; // <--- 1. ДОБАВИЛИ ИМПОРТ
import { DashboardPage } from "./pages/DashboardPage";
import { InventoryPage } from "./pages/InventoryPage";
import { AutoOrdersPage } from "./pages/AutoOrdersPage";
import { SuppliersPage } from "./pages/SuppliersPage";
import { ForecastPage } from "./pages/ForecastPage";
import { OrdersHistoryPage } from "./pages/OrdersHistoryPage";
import { ToolsPage } from "./pages/ToolsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminPage } from "./pages/AdminPage";
import { ActivityLog, Order, Product, Supplier, UserProfile } from "./types";
import { loadFromStorage, saveToStorage } from "./utils/storage";

export default function App() {
  // 2. ДОБАВИЛИ "login" В СОСТОЯНИЕ
  const [viewState, setViewState] = useState<
    "landing" | "login" | "onboarding" | "app"
  >("landing");
  const [activeTab, setActiveTab] = useState("dashboard");

  const [profile, setProfile] = useState<UserProfile>(() =>
    loadFromStorage("sm_profile", initialProfile)
  );
  const [products, setProducts] = useState<Product[]>(() =>
    loadFromStorage("sm_products", initialProducts)
  );
  const [suppliers, setSuppliers] = useState<Supplier[]>(() =>
    loadFromStorage("sm_suppliers", initialSuppliers)
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage("sm_orders", initialOrders)
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([
    { id: "l1", action: "Вход в систему SupplyMate", timestamp: "11:30" },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addLog = (action: string) => {
    setLogs((prev) => [
      {
        id: `l-${Date.now()}`,
        action,
        timestamp: new Date().toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ...prev,
    ]);
  };

  const handleUpdateStock = (id: string, newStock: number) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, stock: Math.max(0, newStock) } : p
    );
    setProducts(updated);
    saveToStorage("sm_products", updated);
  };

  const handleCreateOrder = (newOrder: Order) => {
    const updated = [newOrder, ...orders];
    setOrders(updated);
    saveToStorage("sm_orders", updated);
    addLog(`Заказ #${newOrder.id} отправлен`);
    showToast(`Заказ #${newOrder.id} оформлен!`);
  };

  const lowStockCount = products.filter((p) => p.stock <= p.minStock).length;

  // Экран 1: Приветственная страница (Landing)
  if (viewState === "landing") {
    return (
      <LandingPage
        onStart={() => setViewState("onboarding")}
        onLogin={() => setViewState("login")} // <--- Добавь эту пропсу в LandingPage если там есть кнопка "Войти"
      />
    );
  }

  // Экран 1.5: Страница авторизации (Login)
  if (viewState === "login") {
    return (
      <LoginPage
        onLoginSuccess={() => setViewState("app")}
        onGoToRegister={() => setViewState("onboarding")}
        onGoToLanding={() => setViewState("landing")}
      />
    );
  }

  // Экран 2: Настройка заведения и выбор начальных товаров (Onboarding / Регистрация)
  if (viewState === "onboarding") {
    return (
      <OnboardingPage
        onComplete={(newProfile, selectedProducts) => {
          setProfile(newProfile);
          saveToStorage("sm_profile", newProfile);
          if (selectedProducts && selectedProducts.length > 0) {
            setProducts(selectedProducts);
            saveToStorage("sm_products", selectedProducts);
          }
          setViewState("app");
        }}
      />
    );
  }

  // Экран 3: Главный интерфейс приложения
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lowStockCount={lowStockCount}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="SupplyMate ERP"
          businessName={profile.businessName}
          setActiveTab={setActiveTab}
          lowStockCount={lowStockCount}
        />

        <main className="flex-1 p-5 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

          {activeTab === "dashboard" && (
            <DashboardPage
              products={products}
              orders={orders}
              profile={profile}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "inventory" && (
            <InventoryPage
              products={products}
              setProducts={(p) => {
                setProducts(p);
                saveToStorage("sm_products", p);
              }}
              onUpdateStock={handleUpdateStock}
              addLog={addLog}
              showToast={showToast}
            />
          )}
          {activeTab === "autoorder" && (
            <AutoOrdersPage
              products={products}
              suppliers={suppliers}
              onCreateOrder={handleCreateOrder}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "suppliers" && (
            <SuppliersPage
              suppliers={suppliers}
              setSuppliers={(s) => {
                setSuppliers(s);
                saveToStorage("sm_suppliers", s);
              }}
              showToast={showToast}
              addLog={addLog}
            />
          )}
          {activeTab === "forecast" && <ForecastPage products={products} />}
          {activeTab === "orders" && <OrdersHistoryPage orders={orders} />}
          {activeTab === "tools" && <ToolsPage setActiveTab={setActiveTab} />}
          {activeTab === "profile" && (
            <ProfilePage
              profile={profile}
              productsCount={products.length}
              ordersCount={orders.length}
              logs={logs}
            />
          )}
          {activeTab === "admin" && (
            <AdminPage
              suppliers={suppliers}
              setSuppliers={setSuppliers}
              showToast={showToast}
            />
          )}
        </main>
      </div>
    </div>
  );
}
