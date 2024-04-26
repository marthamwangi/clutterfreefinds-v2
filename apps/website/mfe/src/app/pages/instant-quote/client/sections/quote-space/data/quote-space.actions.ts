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

const setSelectedService = createAction(
  fromCffSpaceActionNames.updateSelectedSpace,
  props<{
    selected_space: ISpaceModel;
  }>()
);

export const fromCffSpacesActions = {
  getCffSpacesFromBE,
  setCffSpacesToStore,
  setSelectedService,
};
