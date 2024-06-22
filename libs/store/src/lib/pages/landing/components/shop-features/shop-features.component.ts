import { NgFor } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';

@Component({
  selector: 'cff-store-shop-features',
  standalone: true,
  templateUrl: './shop-features.component.html',
  imports: [NgFor],
})
export class ShopFeaturesComponent implements AfterViewInit {
  @ViewChild('listElementRef')
  private _listElementRef!: ElementRef;
  #renderer2: Renderer2 = inject(Renderer2);

  public features: Array<any> = [
    {
      title: 'Lightning speed delivery',
      image: '/assets/store/icons/shop-delivery.svg',
      description: 'The earlier the better',
    },
    {
      title: 'Happy shopping',
      image: '/assets/store/icons/shop-cart.svg',
      description: 'We value your experience here',
    },
    {
      title: 'Online Pay',
      image: '/assets/store/icons/shop-wallet.svg',
      description: 'Visa, MasterCard, PayPal, M-Pesa',
    },
    {
      title: 'Festival Offers',
      image: '/assets/store/icons/shop-gift.svg',
      description: 'We value gifting',
    },
    {
      title: 'The best selections',
      image: '/assets/store/icons/shop-love.svg',
      description: 'Get products you will love',
    },
  ];

  ngAfterViewInit() {
    let ul = this._listElementRef.nativeElement;
    if (ul) {
      ul.insertAdjacentHTML('afterend', ul.outerHTML);
      this.#renderer2.setAttribute(ul.nextSibling, 'aria-hidden', 'true');
    }
  }
}
