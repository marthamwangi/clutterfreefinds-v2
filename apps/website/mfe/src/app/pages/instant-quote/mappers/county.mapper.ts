import {
  ConstituencyModel,
  CountyModel,
  IConstituencyModel,
  ICountyModel,
} from '../models/county.model';

export class DeserializeCounty {
  deserialize(data: Array<CountyModel>): Array<ICountyModel> {
    return data.map((entity) => ({
      name: entity.name,
      countyCode: entity.countyCode,
      constituencies: deserializeConstituencies(entity.constituencies),
    }));
  }
}

function deserializeConstituencies(
  data: Array<ConstituencyModel>
): Array<IConstituencyModel> {
  return data.map((entity) => ({
    name: entity.name,
    wards: entity.wards,
  }));
}
