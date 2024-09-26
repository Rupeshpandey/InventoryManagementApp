export interface OrderItem {
    productId: number;
    quantity: number;
    unitPrice: number;
  }
  
  export interface Order {
    customerName: string;
    status: string;
    totalAmount: number;
    orderItems: OrderItem[];
  }
  