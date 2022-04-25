import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsModel } from '../products.model';
import { ProductsService } from '../products.service';
import * as moment from 'moment';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit, OnDestroy {

  private id: number;
  private subscriptions = new Subscription();
  public title: string;

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
    save: 'Salvar',
    delete: 'Deletar',
    maxValue: 'O valor máximo é de 999.999',
    minValue: 'O valor deve ser maior que 0',
  };

  public form: FormGroup = this.fb.group({
    id: null,
    name: ['', Validators.required],
    description: ['', Validators.required],
    sellPrice: ['', Validators.required],
    registerDate: ['', Validators.required],
    quantity: ['', Validators.required],
    isOrganic: [true, Validators.required],
  });

  public maskOptions = { prefix: 'R$ ', thousands: '.', decimal: ',', align: 'left', allowNegative: false, };

  constructor(
    private readonly service: ProductsService,
    private readonly fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.activatedRoute.params.subscribe(res => this.id = res['id']);
  }

  get isEdit() {
    return this.id !== undefined && this.id > 0;
  }

  ngOnInit(): void {
    this.editing();
    this.title = this.id !== undefined && this.id > 0 ? 'Editar Produto' : 'Cadastrar Produto';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * If is editing, gets the data and fills the form
   */
  public editing(): void {
    if (this.isEdit) {
      const form = new ProductsModel();
      form.id = this.id;

      this.subscriptions.add(this.service.getProduct(form).subscribe(data => {
        this.form.reset({
          id: data[0].id,
          name: data[0].name,
          description: data[0].description,
          sellPrice: data[0].sellPrice,
          registerDate: this.dateConfig(data[0].registerDateString),
          quantity: data[0].quantity,
          isOrganic: data[0].isOrganic,
        });
      }));
    }
  }

  /**
   * Save form
   */
  public save(): void {

    // Ensures that no invalid form will be saved
    if (!this.form.valid) {
      return;
    }

    if (this.isEdit) {
      const form = this.form.getRawValue() as ProductsModel;
      form.id = parseInt(this.id.toString());
      this.subscriptions.add(this.service.updateProduct(form).subscribe(data => {
        if (data) {
          this.returnPage();
        }
      }));
    } else {
      const form = this.form.getRawValue() as ProductsModel;
      this.subscriptions.add(this.service.insertProduct(form).subscribe(data => {
        if (data) {
          this.returnPage();
        }
      }));
    }
  }

  /**
   * Deletes the register
   */
  public deleteRegister(): void {
    this.subscriptions.add(this.service.deleteProduct(this.id).subscribe(data => {
      if (data) {
        this.returnPage();
      }
    }));
  }

  /**
   * Validates a number field and the returns the right error message
   * @param field 
   * @returns String
   */
  public validationNumberField(field: string): string {
    const formField = this.form.get(field)?.value;

    if (formField < 0) {
      return this.labels.minValue;
    }

    if (formField > 999999) {
      return this.labels.maxValue;
    }

    return this.labels.required;
  }

  /**
   * Returns to the previous page
   */
  private returnPage(): void {
    this.router.navigate(['products']);
  }

  /**
   * Formats Date to 'YYYY-MM-DD'
   * @param date 
   * @returns 
   */
  private dateConfig(date: string): string {
    return moment(date).format('YYYY-MM-DD');
  }

}
