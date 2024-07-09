import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import {
  AppState,
  BASE_API,
  CART_STORAGE_KEY,
  IResponseModel,
  WEB_API_STORE_PRODUCTS,
} from '@clutterfreefinds-v2/globals';
import { Store } from '@ngrx/store';
import { Observable, Subject, firstValueFrom, of, takeUntil } from 'rxjs';
import { IProduct } from '../../../../data/store.model';
import { ToastrService } from 'ngx-toastr';
import { fromStoreProductsSelector } from '../../../../data/store.selector';
import { fromStoreActions } from '../../../../data/store.actions';
import { CurrencyPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { fromSingleProductActions } from '../../../product-detail/data/product.actions';
import { ClientStorageService } from 'libs/store/src/lib/services/localstorage.service';
import { fromCartActions } from '../../../cart/data/cart.actions';
import { fromCartSelector } from '../../../cart/data/cart.selectors';

@Component({
  selector: 'cff-store-top-products',
  standalone: true,
  templateUrl: './top-products.component.html',
  imports: [NgTemplateOutlet, NgFor, CurrencyPipe, RouterLink, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopProductsComponent implements OnInit, OnDestroy {
  #store: Store<AppState> = inject(Store);
  #changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild('loadingRef')
  private _loadingRef!: TemplateRef<any>;
  @ViewChild('loadedRef')
  private _loadedRef!: TemplateRef<any>;

  @ViewChild('daysRef')
  private _daysRef!: ElementRef<any>;
  @ViewChild('hoursRef')
  private _hoursRef!: ElementRef<any>;
  @ViewChild('minutesRef')
  private _minutesRef!: ElementRef<any>;
  @ViewChild('secondsRef')
  private _secondsRef!: ElementRef<any>;

  #unsubscribe$: Subject<boolean>;
  #store_products$: Observable<Array<IProduct>>;
  #loadProgress$: Observable<boolean>;
  #response$: Observable<IResponseModel>;

  #cartProducts$: Observable<Array<IProduct>>;

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

    this.#cartProducts$ = this.#store.select(
      fromCartSelector.selectCartProductsList
    );
  }
  private _commonChangeDetector(): void {
    this.#changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this._loadProducts();
    this._renderStoreProducts();
    this._listenForLoadingStatus();
    this._countdown();
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
  onAddToCart($clickEvent: MouseEvent, product: IProduct) {
    $clickEvent.stopImmediatePropagation();
    $clickEvent.preventDefault();

    let allCartProducts: Array<IProduct> = [];

    if (localStorage.getItem(CART_STORAGE_KEY)) {
      this.#cartProducts$.subscribe({
        next: (products: Array<IProduct>) => {
          allCartProducts = [...products];
        },
      });
      console.log('all', allCartProducts);
      const productIsInCart = allCartProducts.find(
        (cartProduct) => cartProduct.id == product.id
      );
      if (productIsInCart) {
        allCartProducts = allCartProducts.filter(
          (cartProduct) => cartProduct.id !== product.id
        );
        this.#store.dispatch(
          fromCartActions.CartLandingComponentAcions.update({
            payload: allCartProducts,
          })
        );
        alert('removed from cart');
      } else {
        this.#store.dispatch(
          fromCartActions.CartButtonAction.add({
            payload: product,
          })
        );
        alert('added to cart');
      }
    } else {
      allCartProducts.push(product);
      allCartProducts.forEach((p) =>
        // this.#storageService.StorageAPI('create', CART_STORAGE_KEY, p)
        this.#store.dispatch(
          fromCartActions.CartButtonAction.add({
            payload: p,
          })
        )
      );
      alert('added to cart');
    }
  }

  ngOnDestroy(): void {
    this.#unsubscribe$.next(true);
    this.#unsubscribe$.complete();
  }

  private _countdown() {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    let today = new Date(),
      dd = String(today.getDate() + 1).padStart(2, '0'),
      mm = String(today.getMonth() + 1).padStart(2, '0'),
      yyyy = today.getFullYear(),
      dateString = mm + '/' + dd + '/' + yyyy;

    const countDown = new Date(dateString).getTime();

    setInterval(() => {
      const now = new Date().getTime();
      const distance = countDown - now;

      (this._daysRef.nativeElement.innerText = Math.floor(distance / day)),
        (this._hoursRef.nativeElement.innerText = Math.floor(
          (distance % day) / hour
        )),
        (this._minutesRef.nativeElement.innerText = Math.floor(
          (distance % hour) / minute
        )),
        (this._secondsRef.nativeElement.innerText = Math.floor(
          (distance % minute) / second
        ));
    }, 0);
  }
}
