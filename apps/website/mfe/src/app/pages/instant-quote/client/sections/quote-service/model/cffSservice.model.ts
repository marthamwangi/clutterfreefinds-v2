import { IResponseModel } from '../../../../../../shared/response.model';
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
