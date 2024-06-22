import { IResponseModel } from '@clutterfreefinds-v2/globals';

export interface ProductData {
  id: string;
  colors: Array<string>;
  images: Array<string>;
  title: string;
  image: string;
  price: number;
  description: string;
  postedDate: Date;
  category: ProductCategory;
  size: string;
  material: {
    name: string;
  };
}

export interface IProduct {
  id: string;
  colors: Array<string>;
  images: Array<string>;
  title: string;
  image: string;
  price: number;
  description: string;
  postedDate: Date;
  category: ProductCategory;
  size: string;
  material: {
    name: string;
  };
  isInCart?: boolean;
}

export interface ProductCategory {
  id: string;
  title: string;
}

export interface IStoreProductsResponse extends IResponseModel {
  data: Array<IProduct>;
}
