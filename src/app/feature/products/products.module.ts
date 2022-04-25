import { ProductRegisterComponent } from './product-register/product-register.component';
import { ProductsComponent } from './products.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductsRoutingModule } from './products-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    DataTablesModule,
    MatIconModule,
    MatSelectModule,
  ],
  declarations: [
    ProductsComponent,
    ProductRegisterComponent
  ]
})
export class ProductsModule { }
