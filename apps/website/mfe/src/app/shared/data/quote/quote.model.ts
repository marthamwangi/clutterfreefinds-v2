export interface QuotationData {
  serviceDate: Date;
  images: Array<string>;
  notes: string;
  service: string;
  material: string;
  space: string;
  minimumPrice: number;
  maximumPrice: number;
  serviceType: string;
  clientDetails: {
    county: string;
    constituency: string;
    ward: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    houseNumber: string;
    phone: string;
  };
}

export interface IQuotation {
  date: Date;
  estimates: {
    images: Array<string>;
    notes: string;
    service: string;
    material: string;
    space: string;
  };
  minPrice: number;
  maxPrice: number;
  clientDetails: {
    county: string;
    constituency: string;
    ward: string;
    fname: string;
    lname: string;
    email: string;
    address: string;
    hseNumber: string;
    phone: string;
    serviceType: string;
  };
}
