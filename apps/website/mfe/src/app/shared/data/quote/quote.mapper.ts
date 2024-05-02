import { IQuotation, QuotationData } from './quote.model';

export class QuoteMapper {
  mapTo(quotation: IQuotation): QuotationData {
    return {
      serviceDate: quotation.date,
      images: quotation.estimates.images,
      notes: quotation.estimates.notes,
      service: quotation.estimates.service,
      space: quotation.estimates.space,
      material: quotation.estimates.material,
      minimumPrice: quotation.minPrice,
      maximumPrice: quotation.maxPrice,
      serviceType: quotation.clientDetails.serviceType,
      clientDetails: {
        email: quotation.clientDetails.email,
        firstName: quotation.clientDetails.fname,
        lastName: quotation.clientDetails.lname,
        phone: quotation.clientDetails.phone,
        address: quotation.clientDetails.address,
        houseNumber: quotation.clientDetails.hseNumber,
        county: quotation.clientDetails.county,
        constituency: quotation.clientDetails.constituency,
        ward: quotation.clientDetails.ward,
      },
    };
  }
}
