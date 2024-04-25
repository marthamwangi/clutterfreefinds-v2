import { createReducer, on } from '@ngrx/store';
import { ICffServiceState } from '../model/cffSservice.model';
import { fromCffServiceActions } from './quote-service.actions';
const initialState: ICffServiceState = {
  cffServices: [],
  selected_service: {
    id: '',
    name: '',
    price: 0,
    isSelected: false,
    description: '',
    label: '',
  },
};

export const CFF_SERVICE_REDUCER = createReducer(
  initialState,
  /**
   * on get
   */
  on(fromCffServiceActions.getCffServicesFromBE, (state) => ({ ...state })),
  on(fromCffServiceActions.setCffServiceToStore, (state, { cffServices }) => ({
    ...state,
    cffServices,
  })),
  on(
    fromCffServiceActions.mutateSelectedServiceSelection,
    (state, { selected_service }) => ({
      ...state,
      selected_service,
    })
  )
);
