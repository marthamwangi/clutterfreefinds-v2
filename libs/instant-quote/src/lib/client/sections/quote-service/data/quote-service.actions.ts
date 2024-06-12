import { createAction, createActionGroup, props } from '@ngrx/store';
import { fromCffServiceActionNames } from './quote-service.actions-names';
import { IResponseModel } from '@clutterfreefinds-v2/globals';
import { ICffService } from './cffSservice.model';
const getCffServicesFromBE = createAction(
  fromCffServiceActionNames.fetchCffServices,
  props<{
    url: string;
  }>()
);

const mutateSelectedServiceSelection = createAction(
  fromCffServiceActionNames.updateSelectedService,
  props<{
    selected_service: ICffService;
  }>()
);

const QuoteServiceApi = createActionGroup({
  source: 'Quote Service API',
  events: {
    'Quote Services On Failure': props<{ response: IResponseModel }>(),
    'Quote Services On Success': props<{ response: Array<ICffService> }>(),
  },
});
export const fromCffServiceActions = {
  getCffServicesFromBE,
  mutateSelectedServiceSelection,
  QuoteServiceApi,
};
