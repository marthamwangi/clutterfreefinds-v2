import { createReducer, on } from '@ngrx/store';
import { IMaterialState } from '@clutterfreefinds-v2/globals';
import { fromMaterialActions } from './quote-material.action';

const initialState: IMaterialState = {
  cffMaterials: [],
  selected_material: {
    id: 'zf85J3jMBM5zJRZ6fRCv',
    name: '',
    percentagePrice: 0,
    pros: [],
    cons: [],
  },
  is_loading: false,
  response: {
    success: false,
  },
};

export const CFF_MATERIAL_REDUCER = createReducer(
  initialState,
  on(fromMaterialActions.getMaterialsFromBE, (state) => ({
    ...state,
    is_loading: true,
  })),
  on(
    fromMaterialActions.QuoteMaterialApi.quoteMaterialOnSuccess,
    (state, { response }) => ({
      ...state,
      cffMaterials: response,
      is_loading: false,
    })
  ),
  on(
    fromMaterialActions.QuoteMaterialApi.quoteMaterialOnFailure,
    (state, { response }) => ({
      ...state,
      is_loading: false,
      response: { message: response.message, success: false },
    })
  ),
  on(
    fromMaterialActions.setSelectedMaterial,
    (state, { selected_material }) => ({
      ...state,
      selected_material,
    })
  )
);
