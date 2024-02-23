import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cff-v2-the-process',
  standalone: true,
  imports: [TranslateModule, NgFor],
  templateUrl: './the-process.component.html',
  styleUrls: ['./the-process.component.scss'],
})
export class TheProcessComponent {
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
      image: 'consult.png',
    },
    {
      number: '2',
      title: 'HOME_PAGE.THE_PROCESS.PROCESS.ITEM_2.TITLE',
      description: 'HOME_PAGE.THE_PROCESS.PROCESS.ITEM_2.DESCRIPTION',
      image: 'estimate.png',
    },
    {
      number: '3',
      title: 'HOME_PAGE.THE_PROCESS.PROCESS.ITEM_3.TITLE',
      description: 'HOME_PAGE.THE_PROCESS.PROCESS.ITEM_3.DESCRIPTION',
      image: 'schedule.png',
    },
    {
      number: '4',
      title: 'HOME_PAGE.THE_PROCESS.PROCESS.ITEM_4.TITLE',
      description: 'HOME_PAGE.THE_PROCESS.PROCESS.ITEM_4.DESCRIPTION',
      image: 'transform.png',
    },
  ];
}
