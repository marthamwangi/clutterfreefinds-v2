import { IResponseModel } from './response.model';

export interface IMaterialModel {
  name: string;
  percentagePrice: number;
  pros: Array<string>;
  cons: Array<string>;
  isSelected?: boolean;
}

export interface MaterialResponse extends IResponseModel {
  data: Array<MaterialModel>;
}

export interface MaterialModel {
  name: string;
  percentagePrice: number;
  pros: Array<string>;
  cons: Array<string>;
}
