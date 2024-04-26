import { createSelector } from '@ngrx/store';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';

const allSpaces = (state: AppState) => state.cff_spaces.cffSpaces;
const selectedSpace = (state: AppState) => state.cff_spaces.selected_space;

const selectSepacesList = createSelector(allSpaces, (statePiece) => statePiece);

const selectedSpaceSelector = createSelector(
  selectedSpace,
  (statePiece) => statePiece
);

export const fromSpaceSelectors = {
  selectSepacesList,
  selectedSpaceSelector,
};
