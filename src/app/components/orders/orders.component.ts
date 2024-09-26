import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service'; 
import { Order,OrderItem } from 'src/app/models/order.model'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  newOrder: Order = {
    customerName: '',
    status: 'Pending',
    totalAmount: 0,
    orderItems: []
  };
  newItem: OrderItem = { productId: 0, quantity: 0, unitPrice: 0 };

  constructor(private orderService: OrderService) {}

  addItem(): void {
    this.newOrder.orderItems.push({ ...this.newItem });
    this.newOrder.totalAmount += this.newItem.unitPrice * this.newItem.quantity;
    this.newItem = { productId: 0, quantity: 0, unitPrice: 0 };
  }

  placeOrder(): void {
    this.orderService.addOrder(this.newOrder).subscribe(() => {
      Swal.fire('Success', 'Order placed successfully', 'success');
      this.newOrder = { customerName: '', status: 'Pending', totalAmount: 0, orderItems: [] };
    });
  }
}
