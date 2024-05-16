import { createAction, createActionGroup, props } from '@ngrx/store';
import { fromCffSpaceActionNames } from './quote-space.action-names';
import { ISpaceModel } from '../models/space.model';
import { IResponseModel } from 'apps/website/mfe/src/app/shared/response.model';

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
