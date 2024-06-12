import { IResponseModel } from '@clutterfreefinds-v2/globals';

export interface ICffService {
  id: string;
  name: string;
  price: number;
  description: string;
  label: string;
}

export interface ICffServiceResponse extends IResponseModel {
  data: Array<CffServiceModel>;
}

export interface CffServiceModel {
  id: string;
  name: string;
  price: number;
  description: string;
}
