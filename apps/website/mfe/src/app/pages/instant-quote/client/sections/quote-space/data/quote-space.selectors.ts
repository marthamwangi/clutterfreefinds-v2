import { createSelector } from '@ngrx/store';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';

const allSpaces = (state: AppState) => state.cff_spaces.cffSpaces;

const selectSepacesList = createSelector(allSpaces, (statePiece) => statePiece);

export const fromSpaceSelectors = {
  selectSepacesList,
};
