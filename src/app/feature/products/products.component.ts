import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/shared/helper.service';
import { ProductsModel } from './products.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();
  public listModel: ProductsModel[] = [];
  public dtOptions: DataTables.Settings = {};

  public form: FormGroup = this.fb.group({
    id: null,
    name: '',
    description: '',
    sellPrice: '',
    registerDate: '',
    quantity: '',
    isOrganic: true,
  });

  public typeOptionsList = [
    {
      desc: 'Orgânico',
      value: true
    },
    {
      desc: 'Não orgânico',
      value: false
    }
  ];

  public labels = {
    title: 'Products',
    name: 'Nome',
    description: 'Descrição',
    sellPrice: 'Preço de Venda',
    registerDate: 'Data de Registro',
    quantity: 'Quantidade',
    isOrganic: 'Tipo',
    required: 'Campo Obrigatório!',
    register: 'Cadastrar',
    clean: 'Limpar',
    search: 'Pesquisar',
    edit: 'Editar',
  };

  constructor(
    public router: Router,
    private readonly fb: FormBuilder,
    private readonly helper: HelperService,
    private readonly service: ProductsService
  ) {
    this.dtOptions = this.helper.createDataTableOptions(true, 5);
  }

  ngOnInit(): void {
    this.get();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
 
  /**
   * Consult the data based on the form parameters
   */
  public get(): void {
    const param = this.form.getRawValue() as ProductsModel;
    this.listModel = [];

    this.subscriptions.add(this.service.getProduct(param).subscribe(data => {
      if (data && data.length) {
        this.listModel = data;
      }
    }));
  }

  /**
   * Cleans the form and makes a new request
   */
  public clean(): void {
    this.form.reset({
      id: null,
      name: '',
      description: '',
      sellPrice: '',
      registerDate: '',
      quantity: '',
      isOrganic: true,
    });

    this.listModel = [];
    this.get();
  }

  /**
   * Redirects to the Product register page
   */
  public newRegister(): void {
    this.router.navigate(['products/register']);
  }

  /**
   * Redirects to the Edit Product page
   * @param item 
   */
  public edit(item: ProductsModel): void {
    this.router.navigate([`products/edit/${item.id}`]);
  }

  /**
   * Formats Date to 'DD/MM/YYYY'
   * @param date 
   * @returns 
   */
  public dateConfig(date: string): string {
    return moment(date).format('DD/MM/YYYY');
  }

}
