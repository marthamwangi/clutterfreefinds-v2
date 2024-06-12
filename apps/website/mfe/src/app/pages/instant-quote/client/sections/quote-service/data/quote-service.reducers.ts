import { createReducer, on } from '@ngrx/store';
import { fromCffServiceActions } from './quote-service.actions';
import { ICffServiceState } from '@clutterfreefinds-v2/globals';
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
  response: {
    success: false,
  },
};

export const CFF_SERVICE_REDUCER = createReducer(
  initialState,
  on(fromCffServiceActions.getCffServicesFromBE, (state) => ({
    ...state,
    is_loading: true,
  })),
  on(
    fromCffServiceActions.QuoteServiceApi.quoteServicesOnSuccess,
    (state, { response }) => ({
      ...state,
      cffServices: response,
      is_loading: false,
      response: { success: true },
    })
  ),
  on(
    fromCffServiceActions.mutateSelectedServiceSelection,
    (state, { selected_service }) => ({
      ...state,
      selected_service,
      is_loading: false,
    })
  ),
  on(
    fromCffServiceActions.QuoteServiceApi.quoteServicesOnFailure,
    (state, { response }) => ({
      ...state,
      is_loading: false,
      response: { message: response.message, success: false },
    })
  )
);
