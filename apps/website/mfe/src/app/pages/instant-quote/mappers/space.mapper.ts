import { ISpaceModel, SpaceModel } from '../models/space.model';

export class DeserializeSpace {
  deserialize(data: Array<SpaceModel>): Array<ISpaceModel> {
    return data.map((entity) => ({
      name: entity.name,
      maxHours: entity.maxHours,
      minHours: entity.minHours,
    }));
  }
}
