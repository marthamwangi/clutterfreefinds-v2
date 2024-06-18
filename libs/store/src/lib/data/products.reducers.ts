import { IStorProductsState } from '@clutterfreefinds-v2/globals';
import { createReducer, on } from '@ngrx/store';
import { fromStoreActions } from './products.actions';

const initialState: IStorProductsState = {
  store_products: [],
  is_loading: false,
  response: {
    success: false,
  },
};

export const STORE_PRODUCT_REDUCER = createReducer(
  initialState,
  on(fromStoreActions.StoreProducts.list, (state) => ({
    ...state,
    is_loading: true,
  })),
  on(fromStoreActions.StoreApi.storeListOnSuccess, (state, { response }) => ({
    ...state,
    store_products: response,
    is_loading: false,
    response: { success: true },
  })),
  on(fromStoreActions.StoreApi.storeListOnFailure, (state, { response }) => ({
    ...state,
    is_loading: false,
    response: { message: response.message, success: false },
  }))
);
