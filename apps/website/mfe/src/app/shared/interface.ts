import { ActionReducerMap } from '@ngrx/store';
import { ICffService } from '../pages/instant-quote/client/sections/quote-service/model/cffSservice.model';
import { ISpaceModel } from '../pages/instant-quote/client/sections/quote-space/models/space.model';
import { CFF_SERVICE_REDUCER } from '../pages/instant-quote/client/sections/quote-service/data/quote-service.reducers';
import { CFF_SPACE_REDUCER } from '../pages/instant-quote/client/sections/quote-space/data/quote-space.reducers';

interface ICffServiceState {
  cffServices: Array<ICffService>;
  selected_service: ICffService;
}

export interface ISpaceState {
  cffSpaces: Array<ISpaceModel>;
  selected_space: ISpaceModel;
}
export interface AppState {
  cff_services: ICffServiceState;
  cff_spaces: ISpaceState;
}

const reducers: ActionReducerMap<AppState> = {
  cff_services: CFF_SERVICE_REDUCER,
  cff_spaces: CFF_SPACE_REDUCER,
};

export const APP_STORE = {
  cff_store: reducers,
};
