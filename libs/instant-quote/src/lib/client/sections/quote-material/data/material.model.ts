import { IResponseModel } from '@clutterfreefinds-v2/globals';

export interface IMaterialModel {
  id: string;
  name: string;
  percentagePrice: number;
  pros: Array<string>;
  cons: Array<string>;
}

export interface MaterialResponse extends IResponseModel {
  data: Array<MaterialModel>;
}

export interface MaterialModel {
  id: string;
  name: string;
  percentagePrice: number;
  pros: Array<string>;
  cons: Array<string>;
}
