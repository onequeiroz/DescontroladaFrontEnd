import { DataTablesModule } from 'angular-datatables';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { MatIconModule } from '@angular/material/icon';

const components = [
  HeaderComponent,
];

const imports = [
  ReactiveFormsModule,
  FormsModule,
  DataTablesModule,
  MatIconModule
 ];

@NgModule({
  imports: [ ...imports, ],
  declarations: components,
  providers: [],
  exports: [...components, ...imports],
  bootstrap: [],
  entryComponents: [],
})
export class SharedModule {}

