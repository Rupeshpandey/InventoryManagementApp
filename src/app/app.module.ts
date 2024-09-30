import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { InventoryComponent } from './components/inventory/inventory.component';
import { AddInventoryComponent } from './components/inventory/add-inventory/add-inventory.component';
import { EditInventoryComponent } from './components/inventory/edit-inventory/edit-inventory.component';
import { AddOrderComponent } from './components/orders/add-order/add-order.component';
import { EditOrderComponent } from './components/orders/edit-order/edit-order.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { AddSupplierComponent } from './components/suppliers/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './components/suppliers/edit-supplier/edit-supplier.component';
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    OrdersComponent,
    InventoryComponent,
    AddInventoryComponent,
    EditInventoryComponent,
    AddOrderComponent,
    EditOrderComponent,
    AddProductComponent,
    EditProductComponent,
    SuppliersComponent,
    AddSupplierComponent,
    EditSupplierComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
