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
};

export const CFF_SPACE_REDUCER = createReducer(
  initialState,
  on(fromCffSpacesActions.getCffSpacesFromBE, (state) => ({ ...state })),
  on(fromCffSpacesActions.setCffSpacesToStore, (state, { cffSpaces }) => ({
    ...state,
    cffSpaces,
  }))
);
