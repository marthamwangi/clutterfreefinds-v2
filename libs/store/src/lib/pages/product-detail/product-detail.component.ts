import { NgTemplateOutlet, NgFor, CurrencyPipe, NgIf } from '@angular/common';
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
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  AppState,
  BASE_API,
  IResponseModel,
  WEB_API_PRODUCT,
} from '@clutterfreefinds-v2/globals';
import { Store } from '@ngrx/store';
import { Subject, Observable, firstValueFrom, takeUntil } from 'rxjs';
import { IProduct } from '../../data/store.model';
import { ToastrService } from 'ngx-toastr';
import { fromProductSelector } from './data/product.selector';
import { fromSingleProductActions } from './data/product.actions';

@Component({
  selector: 'cff-store-product-detail',
  standalone: true,
  imports: [NgTemplateOutlet, NgFor, CurrencyPipe, RouterLink, NgIf],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  #store: Store<AppState> = inject(Store);
  #changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  @ViewChild('loadingRef')
  private _loadingRef!: TemplateRef<any>;
  @ViewChild('loadedRef')
  private _loadedRef!: TemplateRef<any>;

  #unsubscribe$: Subject<boolean>;
  #product$: Observable<IProduct>;
  #loadProgress$: Observable<boolean>;
  #response$: Observable<IResponseModel>;

  renderedProduct!: IProduct;
  loadStatus!: number;

  constructor(private _toastrService: ToastrService) {
    this.#unsubscribe$ = new Subject<boolean>();
    this.#product$ = this.#store.select(fromProductSelector.selectProduct);
    this.#loadProgress$ = this.#store.select(
      fromProductSelector.selectLoadingList
    );
    this.#response$ = this.#store.select(fromProductSelector.selectResponse);
  }

  private _commonChangeDetector(): void {
    this.#changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this._loadProduct();
    this._renderStoreProduct();
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

  private _renderStoreProduct() {
    this.#product$.subscribe((data: IProduct) => {
      this.renderedProduct = data;
    });
  }

  public returnListTemplate(): TemplateRef<any> {
    const templateMap: any = {
      1: this._loadingRef,
      0: this._loadedRef,
    };
    return templateMap[this.loadStatus];
  }

  private async _loadProduct() {
    const existingProduct = await firstValueFrom(this.#product$);
    const response = await firstValueFrom(this.#response$);
    if (existingProduct.id !== '') {
      this.renderedProduct = existingProduct;
      this._commonChangeDetector();
      return;
    } else {
      const param = this.#activatedRoute.snapshot.params['id'];
      this.#store.dispatch(
        fromSingleProductActions.SingleProduct.get({
          url: `${BASE_API}/${WEB_API_PRODUCT}`,
          param,
        })
      );
    }
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

  ngOnDestroy(): void {
    this.#unsubscribe$.next(true);
    this.#unsubscribe$.complete();
  }
}
