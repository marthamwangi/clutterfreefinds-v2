import { createAction, createActionGroup, props } from '@ngrx/store';
import { fromCffSpaceActionNames } from './quote-space.action-names';
import { IResponseModel } from '@clutterfreefinds-v2/globals';
import { ISpaceModel } from './space.model';
const getCffSpacesFromBE = createAction(
  fromCffSpaceActionNames.fetchCffSpaces,
  props<{
    url: string;
  }>()
);

const setSelectedService = createAction(
  fromCffSpaceActionNames.updateSelectedSpace,
  props<{
    selected_space: ISpaceModel;
  }>()
);

const QuoteSpaceApi = createActionGroup({
  source: 'Quote Space API',
  events: {
    'Quote Space On Failure': props<{ response: IResponseModel }>(),
    'Quote Space On Success': props<{ response: Array<ISpaceModel> }>(),
  },
});

export const fromCffSpacesActions = {
  getCffSpacesFromBE,
  setSelectedService,
  QuoteSpaceApi,
};
