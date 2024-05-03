import { createReducer, on } from '@ngrx/store';
import { fromCffServiceActions } from './quote-service.actions';
import { ICffServiceState } from 'apps/website/mfe/src/app/shared/interface';
const initialState: ICffServiceState = {
  cffServices: [],
  selected_service: {
    id: '',
    name: '',
    price: 0,
    description: '',
    label: '',
  },
  is_loading: false,
};

export const CFF_SERVICE_REDUCER = createReducer(
  initialState,
  /**
   * on get
   */
  on(fromCffServiceActions.getCffServicesFromBE, (state) => ({
    ...state,
    is_loading: true,
  })),
  on(fromCffServiceActions.setCffServiceToStore, (state, { cffServices }) => ({
    ...state,
    cffServices,
    is_loading: false,
  })),
  on(
    fromCffServiceActions.mutateSelectedServiceSelection,
    (state, { selected_service }) => ({
      ...state,
      selected_service,
      is_loading: false,
    })
  )
);
