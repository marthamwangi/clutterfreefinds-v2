import { createSelector } from '@ngrx/store';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';

const allMaterials = (state: AppState) => state.cff_materials.cffMaterials;
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

export const fromMaterialSelectors = {
  selectMaterialsList,
  selectedMaterialSelector,
};