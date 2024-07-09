import { IProduct, ProductData } from '../../../data/store.model';

export class SingleProductMapper {
  mapTo(entity: ProductData): IProduct {
    return {
      id: entity.id,
      colors: entity.colors,
      images: entity.images,
      title: entity.title,
      image: entity.image,
      price: entity.price,
      description: entity.description,
      postedDate: entity.postedDate,
      category: entity.category,
      size: entity.size,
      material: entity.material,
    };
  }
}
