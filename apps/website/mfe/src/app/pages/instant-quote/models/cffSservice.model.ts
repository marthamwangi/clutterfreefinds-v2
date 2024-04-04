import { IResponseModel } from './response.model';

export interface ICffService {
  name: string;
  price: number;
  description: string;
  label: string;
  isSelected?: boolean;
}

export interface ICffServiceResponse extends IResponseModel {
  data: Array<CffServiceModel>;
}

export interface CffServiceModel {
  name: string;
  price: number;
  description: string;
}
