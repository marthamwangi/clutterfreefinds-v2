import { IResponseModel } from '@clutterfreefinds-v2/globals';
import { IProduct } from '../../../data/store.model';

export interface IProductResponse extends IResponseModel {
  data: IProduct;
}
