import { createReducer, on } from '@ngrx/store';
import { IClientDetailsState } from 'apps/website/mfe/src/app/shared/interface';
import { fromClientDetailsActions } from './quote-client-details.actions';

const initialState: IClientDetailsState = {
  email: '',
  fname: '',
  lname: '',
  address: '',
  hseNumber: '',
  phone: '',
  serviceType: 'home',
};

export const CLIENT_DETAILS_REDUCER = createReducer(
  initialState,
  on(fromClientDetailsActions.ClientDataInput.email, (state, { input }) => ({
    ...state,
    email: input,
  })),
  on(fromClientDetailsActions.ClientDataInput.fname, (state, { input }) => ({
    ...state,
    fname: input,
  })),
  on(fromClientDetailsActions.ClientDataInput.lname, (state, { input }) => ({
    ...state,
    lname: input,
  })),
  on(fromClientDetailsActions.ClientDataInput.address, (state, { input }) => ({
    ...state,
    address: input,
  })),
  on(
    fromClientDetailsActions.ClientDataInput.hseNumber,
    (state, { input }) => ({
      ...state,
      hseNumber: input,
    })
  ),
  on(fromClientDetailsActions.ClientDataInput.phone, (state, { input }) => ({
    ...state,
    phone: input,
  })),
  on(
    fromClientDetailsActions.ClientDataInput.serviceType,
    (state, { input }) => ({
      ...state,
      serviceType: input,
    })
  )
);
