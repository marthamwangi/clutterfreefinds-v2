import { IResponseModel } from '../../../../models/response.model';
export interface ICffServiceState {
  cffServices: Array<ICffService>;
  selected_service: ICffService;
}

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
