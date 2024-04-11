import { IMaterialModel, MaterialModel } from '../models/material.model';

export class DeserializeMaterial {
  deserialize(data: Array<MaterialModel>): Array<IMaterialModel> {
    return data.map((entity) => ({
      name: entity.name,
      percentagePrice: entity.percentagePrice,
      pros: entity.pros,
      cons: entity.cons,
    }));
  }
}