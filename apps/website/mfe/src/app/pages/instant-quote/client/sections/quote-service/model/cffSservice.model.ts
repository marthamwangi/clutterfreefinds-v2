import { Action, ActionReducer } from '@ngrx/store';
import { IResponseModel } from '../../../../models/response.model';
import { CFF_SERVICE_REDUCER } from '../data/quote-service.reducers';

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
  isSelected?: boolean;
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
