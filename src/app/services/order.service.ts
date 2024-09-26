import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:5000/api/order';  // Replace with your API URL

  constructor(private http: HttpClient) { }

  addOrder(order: Order): Observable<any> {
    return this.http.post(`${this.baseUrl}`, order);
  }
}
