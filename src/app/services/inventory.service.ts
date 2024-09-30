// src/app/services/inventory.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Inventory {
  id: number;
  productId: number;
  stockLevel: number;
  lastUpdated: Date;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'https://localhost:7240/api/Inventory'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiUrl}`);
  }

  getItemById(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/${id}`);
  }

  addItem(item: Inventory): Observable<any> {
    return this.http.post(`${this.apiUrl}`, item);
  }

  updateItem(id: number, item: Inventory): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
