import { createAction, createActionGroup, props } from '@ngrx/store';
import { fromMaterialActionNames } from './quote-material.action-names';
import { IResponseModel } from '@clutterfreefinds-v2/globals';
import { IMaterialModel } from './material.model';
const getMaterialsFromBE = createAction(
  fromMaterialActionNames.fetchMaterial,
  props<{
    url: string;
  }>()
);

const setSelectedMaterial = createAction(
  fromMaterialActionNames.updateSelectedMaterial,
  props<{
    selected_material: IMaterialModel;
  }>()
);

const QuoteMaterialApi = createActionGroup({
  source: 'Quote Material API',
  events: {
    'Quote Material On Failure': props<{ response: IResponseModel }>(),
    'Quote Material On Success': props<{ response: Array<IMaterialModel> }>(),
  },
});

export const fromMaterialActions = {
  getMaterialsFromBE,
  setSelectedMaterial,
  QuoteMaterialApi,
};
