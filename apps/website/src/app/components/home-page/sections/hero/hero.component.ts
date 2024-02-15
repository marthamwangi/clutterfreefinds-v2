import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cff-v2-hero',
  standalone: true,
  imports: [TranslateModule, NgFor],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
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
  ];
}
