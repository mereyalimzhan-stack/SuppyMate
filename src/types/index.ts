export interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  stock: number;
  minStock: number;
  dailyUsage: number;
  isCustom?: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  deliveryDays: number;
  reliability: number;
  delayRate: number;
  price: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface Order {
  id: string;
  supplierId: string;
  supplierName: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: "Draft" | "Sent" | "InTransit" | "Delivered" | "Cancelled";
}

export interface UserProfile {
  businessName: string;
  businessType: string;
  locationsCount: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
}
