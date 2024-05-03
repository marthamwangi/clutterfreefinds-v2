import { CffServiceModel, ICffService } from '../model/cffSservice.model';

export class DeserializeCffService {
  deserialize(data: Array<CffServiceModel>): Array<ICffService> {
    return data.map((entity) => ({
      id: entity.id,
      name: entity.name,
      price: entity.price,
      description: entity.description,
      label: entity.name.toLowerCase(),
    }));
  }
}
