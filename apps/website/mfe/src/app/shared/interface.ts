import { ActionReducerMap } from '@ngrx/store';
import { ICffService } from '../pages/instant-quote/client/sections/quote-service/model/cffSservice.model';
import { ISpaceModel } from '../pages/instant-quote/client/sections/quote-space/models/space.model';
import { CFF_SERVICE_REDUCER } from '../pages/instant-quote/client/sections/quote-service/data/quote-service.reducers';
import { CFF_SPACE_REDUCER } from '../pages/instant-quote/client/sections/quote-space/data/quote-space.reducers';
import { IMaterialModel } from '../pages/instant-quote/client/sections/quote-material/models/material.model';
import { CFF_MATERIAL_REDUCER } from '../pages/instant-quote/client/sections/quote-material/data/quote-material.reducers';
import { MaterialEffects } from '../pages/instant-quote/client/sections/quote-material/data/quote-material.effects';
import { CFFSpacesEffects } from '../pages/instant-quote/client/sections/quote-space/data/quote-space.effects';
import { CFFServiceEffects } from '../pages/instant-quote/client/sections/quote-service/data/quote-service.effects';

/**
 * @ICffServiceState
 * contains the state of the Cff Service
 */
export interface ICffServiceState {
  cffServices: Array<ICffService>;
  selected_service: ICffService;
  is_loading: boolean;
}

/**
 * @ISpaceState
 * contains the state of the Cff Spaces
 */
export interface ISpaceState {
  cffSpaces: Array<ISpaceModel>;
  selected_space: ISpaceModel;
  is_loading: boolean;
}

/**
 * @IMaterialState
 * contains the state of the Cff Materials
 */
export interface IMaterialState {
  cffMaterials: Array<IMaterialModel>;
  selected_material: IMaterialModel;
  is_loading: boolean;
}
export interface AppState {
  cff_services: ICffServiceState;
  cff_spaces: ISpaceState;
  cff_materials: IMaterialState;
}

const reducers: ActionReducerMap<AppState> = {
  cff_services: CFF_SERVICE_REDUCER,
  cff_spaces: CFF_SPACE_REDUCER,
  cff_materials: CFF_MATERIAL_REDUCER,
};

export const APP_STORE = {
  cff_store: reducers,
};

export const APP_EFFECTS = [
  MaterialEffects,
  CFFServiceEffects,
  CFFSpacesEffects,
];
