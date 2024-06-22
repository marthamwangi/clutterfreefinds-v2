import { ICartState } from '@clutterfreefinds-v2/globals';
import { createReducer, on } from '@ngrx/store';
import { fromCartActions } from './cart.actions';

const initialState: ICartState = {
  products: [],
  is_loading: false,
  response: {
    success: false,
  },
};
export const CART_REDUCER = createReducer(
  initialState,
  on(
    fromCartActions.CartButtonAction.load,
    fromCartActions.Cart.load,
    (state) => ({
      ...state,
      is_loading: true,
    })
  ),
  on(fromCartActions.CartAPI.cartListOnSuccess, (state, { response }) => ({
    ...state,
    products: response.data,
    is_loading: false,
    response: { success: response.success, message: response.message },
  })),
  on(fromCartActions.CartAPI.cartListOnFailure, (state, { response }) => ({
    ...state,
    is_loading: false,
    response: { success: response.success, message: response.message },
  })),
  on(fromCartActions.CartButtonAction.add, (state) => ({
    ...state,
    is_loading: true,
  })),
  on(fromCartActions.CartAPI.cartCreateOnSuccess, (state, { response }) => ({
    ...state,
    is_loading: false,
    response: {
      success: response.success,
      message: response.message,
    },
  })),
  on(fromCartActions.CartAPI.cartCreateOnFailure, (state, { response }) => ({
    ...state,
    is_loading: false,
    response: {
      success: response.success,
      message: response.message,
    },
  })),
  on(fromCartActions.CartLandingComponentAcions.update, (state) => ({
    ...state,
    is_loading: true,
  })),
  on(fromCartActions.CartAPI.cartUpdateOnSuccess, (state, { response }) => ({
    ...state,
    is_loading: false,
    response: {
      success: response.success,
      message: response.message,
    },
  })),
  on(fromCartActions.CartAPI.cartUpdateOnFailure, (state, { response }) => ({
    ...state,
    is_loading: false,
    response: {
      success: response.success,
      message: response.message,
    },
  }))
);
