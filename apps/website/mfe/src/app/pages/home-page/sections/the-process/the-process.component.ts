import { NgFor } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BasePage } from '../../../base.page';

@Component({
  selector: 'cff-v2-the-process',
  standalone: true,
  imports: [TranslateModule, NgFor],
  templateUrl: './the-process.component.html',
})
export class TheProcessComponent extends BasePage {
  constructor(injector: Injector) {
    super(injector);
  }

  public processes: Array<{
    number: string;
    title: string;
    description: string;
    image: string;
  }> = [
    {
      number: '1',
      title: 'HOME_PAGE.THE_PROCESS.PROCESS.ITEM_1.TITLE',
      description: 'HOME_PAGE.THE_PROCESS.PROCESS.ITEM_1.DESCRIPTION',
      image: 'consult.svg',
    },
    {
      number: '2',
      title: 'HOME_PAGE.THE_PROCESS.PROCESS.ITEM_2.TITLE',
      description: 'HOME_PAGE.THE_PROCESS.PROCESS.ITEM_2.DESCRIPTION',
      image: 'estimate.svg',
    },
    {
      number: '3',
      title: 'HOME_PAGE.THE_PROCESS.PROCESS.ITEM_3.TITLE',
      description: 'HOME_PAGE.THE_PROCESS.PROCESS.ITEM_3.DESCRIPTION',
      image: 'schedule.svg',
    },
    {
      number: '4',
      title: 'HOME_PAGE.THE_PROCESS.PROCESS.ITEM_4.TITLE',
      description: 'HOME_PAGE.THE_PROCESS.PROCESS.ITEM_4.DESCRIPTION',
      image: 'transform.svg',
    },
  ];
}
