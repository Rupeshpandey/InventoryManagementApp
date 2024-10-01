// src/app/inventory/inventory.component.ts
import { Component, OnInit } from '@angular/core';
import { InventoryService, Inventory } from 'src/app/services/inventory.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventoryItems: Inventory[] = [];
  errorMessage: string = '';

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchInventory();
  }

  fetchInventory(): void {
    this.inventoryService.getAllItems().subscribe(
      (data) => this.inventoryItems = data,
      (error) => this.errorMessage = error
    );
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.inventoryService.deleteItem(id).subscribe(
        () => {
          // Remove the deleted item from the list
          this.inventoryItems = this.inventoryItems.filter(item => item.id !== id);
        },
        (error) => this.errorMessage = error
      );
    }
  }

  editItem(id: number): void {
    this.router.navigate(['/inventory/edit', id]);
  }

  addItem(): void {
    this.router.navigate(['/inventory/add']);
  }
}
