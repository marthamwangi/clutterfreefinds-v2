import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from '../../data/products.model';
import { fromCartSelector } from './data/cart.selectors';
import { AppState } from '@clutterfreefinds-v2/globals';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'cff-store-cart',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgFor, NgIf],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  #store: Store<AppState> = inject(Store);
  cartProducts$: Observable<Array<IProduct>>;

  constructor() {
    this.cartProducts$ = this.#store.select(
      fromCartSelector.selectCartProductsList
    );
  }

  ngOnInit(): void {}
}
