// src/app/components/inventory/add-inventory/add-inventory.component.ts
import { Component, OnInit } from '@angular/core';
import { InventoryService, Inventory } from 'src/app/services/inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
  inventoryForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    public router: Router // Changed to public
  ) {
    this.inventoryForm = this.fb.group({
      productId: ['', [Validators.required, Validators.min(1)]],
      stockLevel: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const newItem: Inventory = {
        id: 0, // ID will be set by the backend
        productId: this.inventoryForm.value.productId,
        stockLevel: this.inventoryForm.value.stockLevel,
        lastUpdated: new Date()
      };

      this.inventoryService.addItem(newItem).subscribe(
        (data) => {
          alert('Inventory item added successfully!');
          this.router.navigate(['/inventory']);
        },
        (error) => this.errorMessage = error
      );
    }
  }

  get f() { return this.inventoryForm.controls as { [key: string]: any }; }
}
