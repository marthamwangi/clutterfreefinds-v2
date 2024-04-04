import { CffServiceModel, ICffService } from '../models/cffSservice.model';

export class DeserializeCffService {
  deserialize(data: Array<CffServiceModel>): Array<ICffService> {
    return data.map((entity) => ({
      name: entity.name,
      price: entity.price,
      description: entity.description,
      label: entity.name.toLowerCase(),
    }));
  }
}
