import { createActionGroup, props } from '@ngrx/store';
import { IProduct } from './products.model';
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
  },
});

export const fromStoreActions = {
  StoreProducts,
  StoreApi,
};
