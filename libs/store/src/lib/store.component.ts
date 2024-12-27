import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppState, CART_STORAGE_KEY } from '@clutterfreefinds-v2/globals';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { fromCartSelector } from './pages/cart/data/cart.selectors';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { fromCartActions } from './pages/cart/data/cart.actions';

@Component({
  selector: 'cff-store',
  templateUrl: 'store.component.html',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe],
})
export class StoreComponent implements OnInit, OnDestroy {
  #store: Store<AppState> = inject(Store);
  #unsubscribe$: Subject<boolean>;
  cartCount$: Observable<number>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.#unsubscribe$ = new Subject<boolean>();
    this.cartCount$ = this.#store.select(fromCartSelector.selectCartCount);
  }
  ngOnInit(): void {
    this._readLocalStorageCart();
  }
  private _readLocalStorageCart() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem(CART_STORAGE_KEY)) {
        this.#store.dispatch(
          fromCartActions.CartLandingComponentAcions.load({
            payload: { read: 'many' },
          })
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.#unsubscribe$.next(true);
    this.#unsubscribe$.complete();
  }
}
