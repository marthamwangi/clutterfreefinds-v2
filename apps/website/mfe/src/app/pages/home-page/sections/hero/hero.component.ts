import { Component, Injector } from '@angular/core';
import { NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeroSliderComponent } from './sections/hero-slider/hero-slider.component';
import { RouterLink } from '@angular/router';
import { BasePage } from '../../../base.page';

@Component({
  selector: 'cff-v2-hero',
  standalone: true,
  imports: [TranslateModule, NgFor, HeroSliderComponent, RouterLink],
  templateUrl: './hero.component.html',
})
export class HeroComponent extends BasePage {
  private vox = 1;

  constructor(injector: Injector) {
    super(injector);
  }

  greaterThan() {
    if (this.vox > 2) {
    }
  }
  // TODO: GETSTATS From APIs
  public statistics: Array<{ statistic: string; value: string }> = [
    {
      statistic: 'HOME_PAGE.HERO_SECTION.STATISTICS.STAT1.NUMBER',
      value: 'HOME_PAGE.HERO_SECTION.STATISTICS.STAT1.VALUE',
    },
    {
      statistic: 'HOME_PAGE.HERO_SECTION.STATISTICS.STAT2.NUMBER',
      value: 'HOME_PAGE.HERO_SECTION.STATISTICS.STAT2.VALUE',
    },
    {
      statistic: 'HOME_PAGE.HERO_SECTION.STATISTICS.STAT3.NUMBER',
      value: 'HOME_PAGE.HERO_SECTION.STATISTICS.STAT3.VALUE',
    },
    {
      statistic: 'HOME_PAGE.HERO_SECTION.STATISTICS.STAT4.NUMBER',
      value: 'HOME_PAGE.HERO_SECTION.STATISTICS.STAT4.VALUE',
    },
    {
      statistic: 'HOME_PAGE.HERO_SECTION.STATISTICS.STAT5.NUMBER',
      value: 'HOME_PAGE.HERO_SECTION.STATISTICS.STAT5.VALUE',
    },
  ];
}
