import { IProduct, ProductData } from './products.model';

export class ProducsMapper {
  mapTo(data: Array<ProductData>): Array<IProduct> {
    return data.map((entity) => ({
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
    }));
  }
}
