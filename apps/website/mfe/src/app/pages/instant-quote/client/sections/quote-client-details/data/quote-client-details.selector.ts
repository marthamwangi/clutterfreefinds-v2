import { createSelector } from '@ngrx/store';
import { AppState } from 'apps/website/mfe/src/app/shared/interface';

const client_details = (state: AppState) => state.client_details;

const EmailSelector = createSelector(client_details, (state) => state.email);
const FnameSelector = createSelector(client_details, (state) => state.fname);
const LnameSelector = createSelector(client_details, (state) => state.lname);
const AddressSelector = createSelector(
  client_details,
  (state) => state.address
);
const HseNumberSelector = createSelector(
  client_details,
  (state) => state.hseNumber
);
const PhoneSelector = createSelector(client_details, (state) => state.phone);
const ServiceTypeSelector = createSelector(
  client_details,
  (state) => state.serviceType
);

export const fromClientDetailsSelector = {
  EmailSelector,
  FnameSelector,
  LnameSelector,
  AddressSelector,
  HseNumberSelector,
  PhoneSelector,
  ServiceTypeSelector,
};
