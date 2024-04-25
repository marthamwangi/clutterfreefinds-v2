import { Action, ActionReducer, ActionReducerMap } from '@ngrx/store';
import { ICffService } from '../pages/instant-quote/client/sections/quote-service/model/cffSservice.model';
import { ISpaceModel } from '../pages/instant-quote/client/sections/quote-space/models/space.model';
import { CFF_SERVICE_REDUCER } from '../pages/instant-quote/client/sections/quote-service/data/quote-service.reducers';

interface ICffServiceState {
  cffServices: Array<ICffService>;
  selected_service: ICffService;
}

export interface ISpaceState {
  spaces: Array<ISpaceModel>;
  selected_space: ISpaceModel;
}
export interface AppState {
  cff_services: ICffServiceState;
}

const reducers: ActionReducerMap<AppState> = {
  cff_services: CFF_SERVICE_REDUCER,
};

export const APP_STORE = {
  cff_store: reducers,
};
