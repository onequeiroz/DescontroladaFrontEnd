import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductRegisterComponent } from "./product-register/product-register.component";
import { ProductsComponent } from "./products.component";

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
      {
        path: 'register',
        component: ProductRegisterComponent,
      },
      {
        path: 'edit/:id',
        component: ProductRegisterComponent,
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsRoutingModule { }
