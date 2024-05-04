import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cff-v2-how-we-do-it',
  standalone: true,
  imports: [TranslateModule, NgFor, NgIf, RouterLink],
  templateUrl: './how-we-do-it.component.html',
  styleUrls: ['./how-we-do-it.component.scss'],
})
export class HowWeDoItComponent {
  public description: Array<{ title: string; bold: boolean }> = [
    {
      title: 'HOME_PAGE.HOW_WE_DO_IT.DESCRIPTION.TEXT_1',
      bold: false,
    },
    {
      title: 'HOME_PAGE.HOW_WE_DO_IT.DESCRIPTION.TEXT_2',
      bold: true,
    },
    {
      title: 'HOME_PAGE.HOW_WE_DO_IT.DESCRIPTION.TEXT_3',
      bold: true,
    },
    {
      title: 'HOME_PAGE.HOW_WE_DO_IT.DESCRIPTION.TEXT_4',
      bold: false,
    },
    {
      title: 'HOME_PAGE.HOW_WE_DO_IT.DESCRIPTION.TEXT_5',
      bold: true,
    },
    {
      title: 'HOME_PAGE.HOW_WE_DO_IT.DESCRIPTION.TEXT_6',
      bold: false,
    },
  ];
}
