import { createReducer, on } from '@ngrx/store';
import { IMaterialState } from 'apps/website/mfe/src/app/shared/interface';
import { fromMaterialActions } from './quote-material.action';

const initialState: IMaterialState = {
  cffMaterials: [],
  selected_material: {
    id: 'default',
    name: 'Choose Material',
    percentagePrice: 1,
    pros: [],
    cons: [],
  },
  is_loading: false,
};

export const CFF_MATERIAL_REDUCER = createReducer(
  initialState,
  on(fromMaterialActions.getMaterialsFromBE, (state) => ({
    ...state,
    is_loading: true,
  })),
  on(fromMaterialActions.setMaterialToStore, (state, { cffMaterials }) => ({
    ...state,
    cffMaterials,
    is_loading: false,
  })),
  on(
    fromMaterialActions.setSelectedMaterial,
    (state, { selected_material }) => ({
      ...state,
      selected_material,
    })
  )
);
