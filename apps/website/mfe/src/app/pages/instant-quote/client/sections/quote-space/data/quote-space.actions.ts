import { createAction, props } from '@ngrx/store';
import { fromCffSpaceActionNames } from './quote-space.action-names';
import { ISpaceModel } from '../models/space.model';

const getCffSpacesFromBE = createAction(
  fromCffSpaceActionNames.fetchCffSpaces,
  props<{
    url: string;
  }>()
);

const setCffSpacesToStore = createAction(
  fromCffSpaceActionNames.createStateCffSpaces,
  props<{
    cffSpaces: Array<ISpaceModel>;
  }>()
);

export const fromCffSpacesActions = {
  getCffSpacesFromBE,
  setCffSpacesToStore,
};
