// src/app/services/suppliers.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private apiUrl = 'https://localhost:7240/api/Suppliers'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiUrl}`);
  }

  getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}/${id}`);
  }

  addSupplier(supplier: Supplier): Observable<any> {
    return this.http.post(`${this.apiUrl}`, supplier);
  }

  updateSupplier(id: number, supplier: Supplier): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, supplier);
  }

  deleteSupplier(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
