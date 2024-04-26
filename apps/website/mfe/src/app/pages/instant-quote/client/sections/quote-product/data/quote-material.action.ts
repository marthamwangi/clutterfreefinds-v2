import { createAction, props } from '@ngrx/store';
import { fromMaterialActionNames } from './quote-material.action-names';
import { IMaterialModel } from '../models/material.model';

const getMaterialsFromBE = createAction(
  fromMaterialActionNames.fetchMaterial,
  props<{
    url: string;
  }>()
);

const setMaterialToStore = createAction(
  fromMaterialActionNames.createStateMaterials,
  props<{
    cffMaterials: Array<IMaterialModel>;
  }>()
);

const setSelectedMaterial = createAction(
  fromMaterialActionNames.updateSelectedMaterial,
  props<{
    selected_material: IMaterialModel;
  }>()
);

export const fromMaterialActions = {
  getMaterialsFromBE,
  setMaterialToStore,
  setSelectedMaterial,
};
