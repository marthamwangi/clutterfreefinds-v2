import { ActionReducerMap } from '@ngrx/store';
import {
  ADDITIONAL_INFO_REDUCER,
  CFF_MATERIAL_REDUCER,
  CFF_SERVICE_REDUCER,
  CFF_SPACE_REDUCER,
  CFFServiceEffects,
  CFFSpacesEffects,
  MaterialEffects,
  IMaterialModel,
  ISpaceModel,
  ICffService,
  ICountyModel,
  IConstituencyModel,
  COUNTY_REDUCER,
  CLIENT_DETAILS_REDUCER,
  INSTANT_QUOTE_REDUCER,
  CountyEffects,
  QuoteEffects,
} from '@clutterfreefinds-v2/instant-quote';
import { IResponseModel } from './response.model';
import {
  INQUIRY_REQUEST_REDUCER,
  FooterEffects,
} from '@clutterfreefinds-v2/footer';
import {
  CART_REDUCER,
  CartEffects,
  IProduct,
  ProductCategory,
  ProductEffects,
  SINGLE_PRODUCT_REDUCER,
  STORE_PRODUCT_REDUCER,
  StoreEffects,
} from '@clutterfreefinds-v2/store';
/**
 * @ICffServiceState
 * contains the state of the Cff Service
 */
export interface ICffServiceState {
  cffServices: Array<ICffService>;
  selected_service: ICffService;
  is_loading: boolean;
  response: IResponseModel;
}

/**
 * @ISpaceState
 * contains the state of the Cff Spaces
 */
export interface ISpaceState {
  cffSpaces: Array<ISpaceModel>;
  selected_space: ISpaceModel;
  is_loading: boolean;
  response: IResponseModel;
}

/**
 * @IMaterialState
 * contains the state of the Cff Materials
 */
export interface IMaterialState {
  cffMaterials: Array<IMaterialModel>;
  selected_material: IMaterialModel;
  is_loading: boolean;
  response: IResponseModel;
}

/**
 * @IAdditionalInfoState
 */
export interface IAdditionalInfoState {
  quote_additional_info: {
    images?: Array<string>;
    notes?: string;
  };
}
/**
 * @ICountyState
 */
export interface ICountyState {
  counties: Array<ICountyModel>;
  selected_county: ICountyModel;
  selected_constituency: IConstituencyModel;
  selected_ward: string;
  is_loading: boolean;
  response: IResponseModel;
}

/**
 * @IClientDetailsState
 */
export interface IClientDetailsState {
  email: string;
  fname: string;
  lname: string;
  address: string;
  hseNumber: string;
  phone: string;
  serviceType: string;
}

export interface InstantQuoteState {
  service_date: string;
  min_price: number;
  max_price: number;
  is_loading: boolean;
  response: IResponseModel;
}

export interface IInquiryRequestState {
  name: string;
  email: string;
  message: string;
  phone: string;
  is_loading: boolean;
  response: IResponseModel;
}

export interface IStorProductsState {
  store_products: Array<IProduct>;
  store_categories: Array<ProductCategory>;
  is_loading: boolean;
  response: IResponseModel;
}

export interface ISelectedProduct {
  product: {
    id: string;
    colors: Array<string>;
    images: Array<string>;
    title: string;
    image: string;
    price: number;
    description: string;
    postedDate: Date;
    category: ProductCategory;
    size: string;
    material: {
      name: string;
    };
    isInCart?: boolean;
  };
  is_loading: boolean;
  response: IResponseModel;
}

export interface ICartState {
  products: Array<IProduct>;
  is_loading: boolean;
  response: IResponseModel;
}

export interface AppState {
  cff_services: ICffServiceState;
  cff_spaces: ISpaceState;
  cff_materials: IMaterialState;
  quote_additional_info: IAdditionalInfoState;
  cff_county: ICountyState;
  client_details: IClientDetailsState;
  instant_quote: InstantQuoteState;
  inquiry_request: IInquiryRequestState;
  store: IStorProductsState;
  selected_product: ISelectedProduct;
  cart: ICartState;
}

const reducers: ActionReducerMap<AppState> = {
  cff_services: CFF_SERVICE_REDUCER,
  cff_spaces: CFF_SPACE_REDUCER,
  cff_materials: CFF_MATERIAL_REDUCER,
  quote_additional_info: ADDITIONAL_INFO_REDUCER,
  cff_county: COUNTY_REDUCER,
  client_details: CLIENT_DETAILS_REDUCER,
  instant_quote: INSTANT_QUOTE_REDUCER,
  inquiry_request: INQUIRY_REQUEST_REDUCER,
  store: STORE_PRODUCT_REDUCER,
  selected_product: SINGLE_PRODUCT_REDUCER,
  cart: CART_REDUCER,
};

export const APP_STORE = {
  cff_store: reducers,
};

export const APP_EFFECTS = [
  MaterialEffects,
  CFFServiceEffects,
  CFFSpacesEffects,
  CountyEffects,
  QuoteEffects,
  FooterEffects,
  StoreEffects,
  ProductEffects,
  CartEffects,
];
