// src/app/components/inventory/edit-inventory/edit-inventory.component.ts
import { Component, OnInit } from '@angular/core';
import { InventoryService, Inventory } from 'src/app/services/inventory.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Define the interface for form controls
interface EditInventoryFormControls {
  id: FormControl<number | null>;
  productId: FormControl<number | null>;
  stockLevel: FormControl<number | null>;
  lastUpdated: FormControl<Date | null>;
}

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.css']
})
export class EditInventoryComponent implements OnInit {
  inventoryForm: FormGroup<EditInventoryFormControls>;
  errorMessage: string = '';
  inventoryId: number = 0;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    public router: Router // Changed to public
  ) {
    this.inventoryForm = this.fb.group({
      id: new FormControl<number | null>({ value: null, disabled: true }),
      productId: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
      stockLevel: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
      lastUpdated: new FormControl<Date | null>({ value: null, disabled: true })
    });
  }

  ngOnInit(): void {
    this.inventoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadInventoryItem();
  }

  loadInventoryItem(): void {
    this.inventoryService.getItemById(this.inventoryId).subscribe(
      (data) => {
        this.inventoryForm.patchValue({
          id: data.id,
          productId: data.productId,
          stockLevel: data.stockLevel,
          lastUpdated: data.lastUpdated
        });
      },
      (error) => this.errorMessage = error
    );
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const updatedItem: Inventory = {
        id: this.inventoryId,
        productId: this.inventoryForm.value.productId!,
        stockLevel: this.inventoryForm.value.stockLevel!,
        lastUpdated: new Date()
      };

      this.inventoryService.updateItem(this.inventoryId, updatedItem).subscribe(
        () => {
          alert('Inventory item updated successfully!');
          this.router.navigate(['/inventory']);
        },
        (error) => this.errorMessage = error
      );
    }
  }

  // Typed accessor for form controls
  get f(): EditInventoryFormControls {
    return this.inventoryForm.controls as EditInventoryFormControls;
  }
}
