import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { NgFor } from '@angular/common';
import {
  AppState,
  BASE_API,
  IResponseModel,
  WEB_API_CATEGORIES,
} from '@clutterfreefinds-v2/globals';
import { Store } from '@ngrx/store';
import { IProduct, ProductCategory } from 'libs/store/src/lib/data/store.model';
import { Subject, Observable, takeUntil, firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { fromStoreProductsSelector } from 'libs/store/src/lib/data/store.selector';
import { fromStoreActions } from 'libs/store/src/lib/data/store.actions';

@Component({
  selector: 'cff-store-filters',
  standalone: true,
  imports: [NgFor],
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  #store: Store<AppState> = inject(Store);
  #changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  @ViewChild('loadingRef')
  private _loadingRef!: TemplateRef<any>;
  @ViewChild('loadedRef')
  private _loadedRef!: TemplateRef<any>;
  #unsubscribe$: Subject<boolean>;
  #store_categories$: Observable<Array<ProductCategory>>;
  #loadProgress$: Observable<boolean>;
  #response$: Observable<IResponseModel>;

  renderedCategories: Array<ProductCategory> = [];
  loadStatus!: number;

  constructor(private _toastrService: ToastrService) {
    this.#unsubscribe$ = new Subject<boolean>();
    this.#store_categories$ = this.#store.select(
      fromStoreProductsSelector.selectStoreCategoriesList
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
    this._loadCategories();
    this._renderStoreCategories();
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

  private _renderStoreCategories() {
    this.#store_categories$.subscribe((data: Array<ProductCategory>) => {
      this.renderedCategories = data;
    });
  }

  public returnListTemplate(): TemplateRef<any> {
    const templateMap: any = {
      1: this._loadingRef,
      0: this._loadedRef,
    };
    return templateMap[this.loadStatus];
  }

  private async _loadCategories() {
    const existingStoreCategories = await firstValueFrom(
      this.#store_categories$
    );
    const response = await firstValueFrom(this.#response$);
    if (existingStoreCategories.length) {
      this.renderedCategories = existingStoreCategories;
      this._commonChangeDetector();
      return;
    }
    this.#store.dispatch(
      fromStoreActions.StoreCategories.list({
        url: `${BASE_API}/${WEB_API_CATEGORIES}`,
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
  // setSelectedProduct(id: string) {
  //   const category = this.renderedCategories.find((element) => element.id === id);
  //   if (category) {
  //     this.#store.dispatch(
  //       fromSingleProductActions.TopProduct.select({ product })
  //     );
  //   }
  // }

  ngOnDestroy(): void {
    this.#unsubscribe$.next(true);
    this.#unsubscribe$.complete();
  }
}
