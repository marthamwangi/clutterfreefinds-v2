import { ISpaceState } from 'apps/website/mfe/src/app/shared/interface';
import { createReducer, on } from '@ngrx/store';
import { fromCffSpacesActions } from './quote-space.actions';

const initialState: ISpaceState = {
  cffSpaces: [],
  selected_space: {
    id: '',
    name: '',
    minHours: 0,
    maxHours: 0,
  },
  is_loading: false,
};

export const CFF_SPACE_REDUCER = createReducer(
  initialState,
  on(fromCffSpacesActions.getCffSpacesFromBE, (state) => ({
    ...state,
    is_loading: true,
  })),
  on(fromCffSpacesActions.setCffSpacesToStore, (state, { cffSpaces }) => ({
    ...state,
    cffSpaces,
    is_loading: false,
  })),
  on(fromCffSpacesActions.setSelectedService, (state, { selected_space }) => ({
    ...state,
    selected_space,
  }))
);
