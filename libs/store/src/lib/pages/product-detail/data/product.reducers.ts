import { ISelectedProduct } from '@clutterfreefinds-v2/globals';
import { createReducer, on } from '@ngrx/store';
import { fromSingleProductActions } from './product.actions';

const initialState: ISelectedProduct = {
  product: {
    isInCart: false,
    id: '',
    colors: [],
    images: [],
    title: '',
    image: '',
    price: 0,
    description: '',
    postedDate: new Date(),
    category: {
      id: '',
      title: '',
    },
    size: '',
    material: {
      name: '',
    },
  },
  is_loading: false,
  response: {
    success: false,
  },
};

export const SINGLE_PRODUCT_REDUCER = createReducer(
  initialState,
  on(fromSingleProductActions.SingleProduct.get, (state) => ({
    ...state,
    is_loading: true,
  })),
  on(
    fromSingleProductActions.StoreApi.productDetailOnSuccess,
    (state, { product }) => ({
      ...state,
      product,
      is_loading: false,
      response: { success: true },
    })
  ),
  on(
    fromSingleProductActions.StoreApi.productDetailOnFailure,
    (state, { response }) => ({
      ...state,
      is_loading: false,
      response: { message: response.message, success: false },
    })
  ),
  on(fromSingleProductActions.TopProduct.select, (state, { product }) => ({
    ...state,
    product,
  }))
);
