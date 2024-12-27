import { createActionGroup, props } from '@ngrx/store';
import { IProduct, ProductCategory } from './store.model';
import { IResponseModel } from '@clutterfreefinds-v2/globals';

const StoreProducts = createActionGroup({
  source: 'Top Products Component',
  events: {
    list: props<{ url: string }>(),
  },
});

const StoreApi = createActionGroup({
  source: 'Store API',
  events: {
    'Store List On Failure': props<{ response: IResponseModel }>(),
    'Store List On Success': props<{ response: Array<IProduct> }>(),
    'Categories List On Failure': props<{ response: IResponseModel }>(),
    'Categories List On Success': props<{ response: Array<ProductCategory> }>(),
  },
});

const StoreCategories = createActionGroup({
  source: 'Filter Products Component',
  events: {
    list: props<{ url: string }>(),
  },
});

export const fromStoreActions = {
  StoreProducts,
  StoreApi,
  StoreCategories,
};
