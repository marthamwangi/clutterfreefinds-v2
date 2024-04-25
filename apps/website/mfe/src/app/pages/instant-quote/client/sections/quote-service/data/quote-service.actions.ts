import { createAction, props } from '@ngrx/store';
import { ICffService } from '../model/cffSservice.model';
import { fromCffServiceActionNames } from './quote-service.actions-names';

const getCffServicesFromBE = createAction(
  fromCffServiceActionNames.fetchCffServices,
  props<{
    url: string;
  }>()
);

const setCffServiceToStore = createAction(
  fromCffServiceActionNames.createStateCffServices,
  props<{
    cffServices: Array<ICffService>;
  }>()
);

const mutateSelectedServiceSelection = createAction(
  fromCffServiceActionNames.updateSelectedService,
  props<{
    service: ICffService;
  }>()
);

export const fromCffServiceActions = {
  getCffServicesFromBE,
  setCffServiceToStore,
  mutateSelectedServiceSelection,
};
