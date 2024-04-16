import { IResponseModel } from './response.model';

export interface ICountyModel {
  countyCode: number;
  name: string;
  constituencies: Array<IConstituencyModel>;
  isSelected?: boolean;
}

export interface IConstituencyModel {
  name: string;
  wards: Array<string>;
}

export interface CountyResponse extends IResponseModel {
  data: Array<CountyModel>;
}

export interface CountyModel {
  countyCode: number;
  name: string;
  constituencies: Array<ConstituencyModel>;
}

export interface ConstituencyModel {
  name: string;
  wards: Array<string>;
}
