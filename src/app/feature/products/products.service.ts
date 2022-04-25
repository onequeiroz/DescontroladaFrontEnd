import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { CommunicationService } from "src/app/core/communication.service";
import { HelperService } from "src/shared/helper.service";
import { ProductsModel } from "./products.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cs: CommunicationService;

  constructor(
    http: HttpClient,
    protected helper: HelperService
  ) {
    this.cs = new CommunicationService('Product', http);
  }

  /**
   * Gets products registers
   * @param form 
   * @returns ProductsModel[]
   */
   getProduct(form: any): Observable<ProductsModel[]> {
    const param = this.helper.getUrl(form);
    return this.cs.get('GetProducts', param).pipe(map(data => data));
  }

  /**
   * Insert a product register
   * @param model 
   * @returns Id product inserted
   */
  insertProduct(model: ProductsModel): Observable<number> {
    return this.cs.post('InsertProduct', model).pipe(
      map(data => {
        if (data) {
          alert('Criação realizada com sucesso.');
          return data;
        }
      })
    );
  }

  /**
   * Update a product register
   * @param model 
   * @returns True or Error
   */
  updateProduct(model: ProductsModel): Observable<boolean> {
    return this.cs.put('UpdateProduct', model).pipe(
      map(data => {
        if (data) {
          alert('Alteração realizada com sucesso.');
          return data;
        }
      })
    )
  }

  /**
   * Delete a product register
   * @param id 
   * @returns True or Error
   */
  deleteProduct(id: number): Observable<boolean> {
    return this.cs.delete('DeleteProduct', id).pipe(map(data => data));
  }
}
