import { createActionGroup, props } from '@ngrx/store';
import { IResponseModel } from '@clutterfreefinds-v2/globals';
import { IProduct } from '../../../data/store.model';

const SingleProduct = createActionGroup({
  source: 'Product Details Component',
  events: {
    get: props<{
      url: string;
      param: string;
    }>(),
  },
});

const TopProduct = createActionGroup({
  source: 'Top Products Component',
  events: {
    select: props<{ product: IProduct }>(),
  },
});

const StoreApi = createActionGroup({
  source: 'Store API',
  events: {
    'Product Detail On Failure': props<{ response: IResponseModel }>(),
    'Product Detail On Success': props<{ product: IProduct }>(),
  },
});

export const fromSingleProductActions = {
  SingleProduct,
  StoreApi,
  TopProduct,
};
