export type OrderStatus = 'placed' | 'confirmed' | 'sketched' | 'cast' | 'set' | 'polished' | 'quality_checked' | 'shipped' | 'delivered';

export interface OrderItem {
  id: string;
  configurationId: string;
  productType: string;
  partsSummary: string[];
  storyNarrative: string;
  previewImageUrl: string;
  totalPrice: number;
  currency: string;
  leadTimeDays: number;
  estimatedShipDate: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}
