import { createSelector } from '@ngrx/store';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';

const isLoading = (state: AppState) => state.cff_materials.is_loading;
const allMaterials = (state: AppState) => state.cff_materials.cffMaterials;
const response = (state: AppState) => state.cff_materials.response;

const selectedMaterial = (state: AppState) =>
  state.cff_materials.selected_material;

const selectMaterialsList = createSelector(
  allMaterials,
  (statePiece) => statePiece
);

const selectedMaterialSelector = createSelector(
  selectedMaterial,
  (statePiece) => statePiece
);

const selectLoadingList = createSelector(isLoading, (statePiece) => statePiece);
const selectResponse = createSelector(response, (statePiece) => statePiece);

export const fromMaterialSelectors = {
  selectMaterialsList,
  selectedMaterialSelector,
  selectLoadingList,
  selectResponse,
};
