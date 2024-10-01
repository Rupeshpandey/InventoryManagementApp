// src/app/services/inventory.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  // Get all inventory items
  getAllItems(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.apiUrl}`)
      .pipe(catchError(this.handleError));
  }

  // Get an inventory item by ID
  getItemById(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Add a new inventory item
  addItem(item: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(`${this.apiUrl}`, item)
      .pipe(catchError(this.handleError));
  }

  // Update an existing inventory item
  updateItem(id: number, item: Inventory): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, item)
      .pipe(catchError(this.handleError));
  }

  // Delete an inventory item
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Client-side Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Server-side Error: ${error.status} - ${error.message}`;
    }
    // Optionally, you can log the error to an external service
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
