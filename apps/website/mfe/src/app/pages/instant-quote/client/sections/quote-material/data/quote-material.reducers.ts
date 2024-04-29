import { createReducer, on } from '@ngrx/store';
import { IMaterialState } from 'apps/website/mfe/src/app/shared/interface';
import { fromMaterialActions } from './quote-material.action';

const initialState: IMaterialState = {
  cffMaterials: [],
  selected_material: {
    id: 'default',
    name: 'Choose Material',
    percentagePrice: 1,
    pros: [
      'Saves purchasing cost',
      'You can test what works for you before buying',
      'Creativity and customization',
    ],
    cons: [
      'Time commitment',
      'May not be as strong or long-lasting',
      'May not be as effective for their intended purpose',
      'May sometimes not be aesthetically pleasing',
    ],
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
