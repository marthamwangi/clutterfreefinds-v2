import { ActionReducerMap } from '@ngrx/store';
import { ICffService } from 'apps/website/mfe/src/app/pages/instant-quote/client/sections/quote-service/model/cffSservice.model';
import { ISpaceModel } from 'apps/website/mfe/src/app/pages/instant-quote/client/sections/quote-space/models/space.model';
import { CFF_SERVICE_REDUCER } from 'apps/website/mfe/src/app/pages/instant-quote/client/sections/quote-service/data/quote-service.reducers';
import { CFF_SPACE_REDUCER } from 'apps/website/mfe/src/app/pages/instant-quote/client/sections/quote-space/data/quote-space.reducers';
import { IMaterialModel } from 'apps/website/mfe/src/app/pages/instant-quote/client/sections/quote-material/models/material.model';
import { CFF_MATERIAL_REDUCER } from 'apps/website/mfe/src/app/pages/instant-quote/client/sections/quote-material/data/quote-material.reducers';
import { MaterialEffects } from 'apps/website/mfe/src/app/pages/instant-quote/client/sections/quote-material/data/quote-material.effects';
import { CFFSpacesEffects } from 'apps/website/mfe/src/app/pages/instant-quote/client/sections/quote-space/data/quote-space.effects';
import { CFFServiceEffects } from 'apps/website/mfe/src/app/pages/instant-quote/client/sections/quote-service/data/quote-service.effects';
import { ADDITIONAL_INFO_REDUCER } from 'apps/website/mfe/src/app/pages/instant-quote/client/sections/quote-additonal-info/data/quote-additional-info.reducer';
import { COUNTY_REDUCER } from 'apps/website/mfe/src/app/shared/data/county/county.reducer';
import { CountyEffects } from 'apps/website/mfe/src/app/shared/data/county/county.effects';
import { CLIENT_DETAILS_REDUCER } from 'apps/website/mfe/src/app/pages/instant-quote/client/sections/quote-client-details/data/quote-client-details.reducers';
import { INSTANT_QUOTE_REDUCER } from 'apps/website/mfe/src/app/shared/data/quote/quote.reducer';
import { QuoteEffects } from 'apps/website/mfe/src/app/shared/data/quote/quote.effects';
import { IResponseModel } from './response.model';
import {
  FooterEffects,
  INQUIRY_REQUEST_REDUCER,
} from '@clutterfreefinds-v2/footer';
import {
  IConstituencyModel,
  ICountyModel,
} from 'apps/website/mfe/src/app/shared/models/county.model';

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
export interface AppState {
  cff_services: ICffServiceState;
  cff_spaces: ISpaceState;
  cff_materials: IMaterialState;
  quote_additional_info: IAdditionalInfoState;
  cff_county: ICountyState;
  client_details: IClientDetailsState;
  instant_quote: InstantQuoteState;
  inquiry_request: IInquiryRequestState;
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
];
