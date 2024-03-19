import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { APP_URL } from '@clutterfreefinds-v2/globals';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'wc-hero-slider',
  standalone: true,
  imports: [TranslateModule, NgFor],
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.scss'],
})
export class HeroSliderComponent {
  public APP_URL = APP_URL;
  public organizingElements = new Array(15);
  public organizingImages: Array<number> = [];

  constructor() {
    for (let index = 0; index < this.organizingElements.length; index++) {
      this.organizingImages.push(index);
    }
  }
}
