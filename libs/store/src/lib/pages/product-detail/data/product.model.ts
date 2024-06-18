import { IResponseModel } from '@clutterfreefinds-v2/globals';
import { IProduct } from '../../../data/products.model';

export interface IProductResponse extends IResponseModel {
  data: IProduct;
}
