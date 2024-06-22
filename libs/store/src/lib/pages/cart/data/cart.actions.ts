import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProduct } from '../../../data/products.model';
import { IResponseModel } from '@clutterfreefinds-v2/globals';

const CartButtonAction = createActionGroup({
  source: 'Cart Button',
  events: {
    add: props<{ payload: IProduct }>(),
    load: props<{ payload: any }>(),
  },
});

const Cart = createActionGroup({
  source: 'Cart Component',
  events: {
    load: props<{ payload: any }>(),
  },
});

const CartLandingComponentAcions = createActionGroup({
  source: 'Landing Component Cart',
  events: {
    update: props<{ payload: any }>(),
    load: props<{ payload: any }>(),
  },
});

const CartAPI = createActionGroup({
  source: 'Cart API',
  events: {
    'Cart List On Failure': props<{ response: IResponseModel }>(),
    'Cart List On Success': props<{ response: IResponseModel }>(),
    'Cart Create On Success': props<{ response: IResponseModel }>(),
    'Cart Create On Failure': props<{ response: IResponseModel }>(),
    'Cart Update On Success': props<{ response: IResponseModel }>(),
    'Cart Update On Failure': props<{ response: IResponseModel }>(),
  },
});
export const fromCartActions = {
  CartButtonAction,
  Cart,
  CartAPI,
  CartLandingComponentAcions,
};
