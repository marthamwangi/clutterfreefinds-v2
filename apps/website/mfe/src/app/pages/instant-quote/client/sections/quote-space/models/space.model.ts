import { IResponseModel } from '../../../../../../shared/response.model';

export interface ISpaceModel {
  id: string;
  name: string;
  maxHours: number;
  minHours: number;
}

export interface SpaceResponse extends IResponseModel {
  data: Array<SpaceModel>;
}

export interface SpaceModel {
  id: string;
  name: string;
  maxHours: number;
  minHours: number;
}
