import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import {
  AppState,
  BASE_API,
  IResponseModel,
  WEB_API_STORE_PRODUCTS,
} from '@clutterfreefinds-v2/globals';
import { Store } from '@ngrx/store';
import { Observable, Subject, firstValueFrom, takeUntil } from 'rxjs';
import { IProduct } from '../../../../data/products.model';
import { ToastrService } from 'ngx-toastr';
import { fromStoreProductsSelector } from '../../../../data/products.selector';
import { fromStoreActions } from '../../../../data/products.actions';
import { CurrencyPipe, NgFor, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { fromSingleProductActions } from '../../../product-detail/data/product.actions';

@Component({
  selector: 'cff-store-top-products',
  standalone: true,
  templateUrl: './top-products.component.html',
  imports: [NgTemplateOutlet, NgFor, CurrencyPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopProductsComponent implements OnInit, OnDestroy {
  #store: Store<AppState> = inject(Store);
  #changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  @ViewChild('loadingRef')
  private _loadingRef!: TemplateRef<any>;
  @ViewChild('loadedRef')
  private _loadedRef!: TemplateRef<any>;

  #unsubscribe$: Subject<boolean>;
  #store_products$: Observable<Array<IProduct>>;
  #loadProgress$: Observable<boolean>;
  #response$: Observable<IResponseModel>;

  renderedProducts: Array<IProduct> = [];
  loadStatus!: number;

  constructor(private _toastrService: ToastrService) {
    this.#unsubscribe$ = new Subject<boolean>();
    this.#store_products$ = this.#store.select(
      fromStoreProductsSelector.selectStoreProductsList
    );
    this.#loadProgress$ = this.#store.select(
      fromStoreProductsSelector.selectLoadingList
    );

    this.#response$ = this.#store.select(
      fromStoreProductsSelector.selectResponse
    );
  }
  private _commonChangeDetector(): void {
    this.#changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this._loadProducts();
    this._renderStoreProducts();
    this._listenForLoadingStatus();
  }

  private _listenForLoadingStatus() {
    this.#loadProgress$.pipe(takeUntil(this.#unsubscribe$)).subscribe((l) => {
      if (l === true) {
        this.loadStatus = 1;
      } else {
        this.loadStatus = 0;
      }
      this._commonChangeDetector();
    });
  }

  private _renderStoreProducts() {
    this.#store_products$.subscribe((data: Array<IProduct>) => {
      this.renderedProducts = data;
    });
  }

  public returnListTemplate(): TemplateRef<any> {
    const templateMap: any = {
      1: this._loadingRef,
      0: this._loadedRef,
    };
    return templateMap[this.loadStatus];
  }

  private async _loadProducts() {
    const existingStoreProducts = await firstValueFrom(this.#store_products$);
    const response = await firstValueFrom(this.#response$);
    if (existingStoreProducts.length) {
      this.renderedProducts = existingStoreProducts;
      this._commonChangeDetector();
      return;
    }
    this.#store.dispatch(
      fromStoreActions.StoreProducts.list({
        url: `${BASE_API}/${WEB_API_STORE_PRODUCTS}`,
      })
    );
    if (!response.success && response.message) {
      this._toastrService.error(
        response.message,
        'Something happened, please try again',
        {
          positionClass: 'toast-top-right',
        }
      );
    }
  }
  setSelectedProduct(id: string) {
    const product = this.renderedProducts.find((element) => element.id === id);
    if (product) {
      this.#store.dispatch(
        fromSingleProductActions.TopProduct.select({ product })
      );
    }
  }
  ngOnDestroy(): void {
    this.#unsubscribe$.next(true);
    this.#unsubscribe$.complete();
  }
}
