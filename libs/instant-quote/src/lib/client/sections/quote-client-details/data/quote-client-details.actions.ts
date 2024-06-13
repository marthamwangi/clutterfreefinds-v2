import { createActionGroup, props } from '@ngrx/store';

const ClientDataInput = createActionGroup({
  source: 'Quote Client Details Component',
  events: {
    email: props<{ input: string }>(),
    fname: props<{ input: string }>(),
    lname: props<{ input: string }>(),
    address: props<{ input: string }>(),
    hseNumber: props<{ input: string }>(),
    phone: props<{ input: string }>(),
    serviceType: props<{ input: string }>(),
  },
});

export const fromClientDetailsActions = {
  ClientDataInput,
};
