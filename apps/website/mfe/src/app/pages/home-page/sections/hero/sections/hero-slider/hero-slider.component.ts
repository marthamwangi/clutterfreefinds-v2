import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { APP_URL } from '@clutterfreefinds-v2/globals';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'wc-hero-slider',
  standalone: true,
  imports: [TranslateModule, NgFor, NgIf, NgOptimizedImage],
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.scss'],
})
export class HeroSliderComponent {
  @ViewChild('sliderRef', { static: true })
  public isSliderVisible: boolean = false;
  @ViewChild('listElementRef')
  private _listElementRef!: ElementRef;
  #renderer2: Renderer2 = inject(Renderer2);

  public APP_URL = APP_URL;
  public organizingElements = new Array(15);
  public organizingImages: Array<number> = [];

  constructor() {
    for (let index = 0; index < this.organizingElements.length; index++) {
      this.organizingImages.push(index);
    }
  }

  ngAfterViewInit() {
    let ul = this._listElementRef.nativeElement;
    if (ul) {
      ul.insertAdjacentHTML('afterend', ul.outerHTML);
      this.#renderer2.setAttribute(ul.nextSibling, 'aria-hidden', 'true');
      this.#renderer2.addClass(ul.nextSibling, 'flex-col-reverse');
      this.#renderer2.addClass(
        ul.nextSibling,
        'animate-infinite-scroll-y-reverse'
      );
    }
  }
}
