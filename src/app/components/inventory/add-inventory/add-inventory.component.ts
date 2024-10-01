// src/app/components/inventory/add-inventory/add-inventory.component.ts
import { Component, OnInit } from '@angular/core';
import { InventoryService, Inventory } from 'src/app/services/inventory.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

// Define the interface for form controls
interface InventoryFormControls {
  productId: FormControl<number | null>;
  stockLevel: FormControl<number | null>;
}

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
  inventoryForm: FormGroup<InventoryFormControls>;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    public router: Router // Ensure router is public
  ) {
    this.inventoryForm = this.fb.group({
      productId: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
      stockLevel: new FormControl<number | null>(null, [Validators.required, Validators.min(0)])
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const newItem: Inventory = {
        id: 0, // ID will be set by the backend
        productId: this.inventoryForm.value.productId!,
        stockLevel: this.inventoryForm.value.stockLevel!,
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

  // Typed accessor for form controls
  get f(): InventoryFormControls {
    return this.inventoryForm.controls as InventoryFormControls;
  }
}
