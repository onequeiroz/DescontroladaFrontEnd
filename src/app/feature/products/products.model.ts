export class ProductsModel {
  id?: number;
  name?: string;
  description?: string;
  sellPrice?: number;
  registerDate?: string;
  registerDateString: string;
  quantity?: number;
  isOrganic = false;
}
