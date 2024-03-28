import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cff-v2-what-we-do',
  standalone: true,
  imports: [TranslateModule, NgFor],
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.scss'],
})
export class WhatWeDoComponent {
  APP_URL = 'clutterfreefinds.com';
  public services: Array<{
    title: string;
    description: string;
    image: string;
    link: string;
  }> = [
    {
      title: 'HOME_PAGE.WHAT_WE_DO.SERVICES.ITEM1.TITLE',
      description: 'HOME_PAGE.WHAT_WE_DO.SERVICES.ITEM1.DESCRIPTION',
      image: 'assets/images/decluttering.png',
      link: '/#',
    },
    {
      title: 'HOME_PAGE.WHAT_WE_DO.SERVICES.ITEM2.TITLE',
      description: 'HOME_PAGE.WHAT_WE_DO.SERVICES.ITEM2.DESCRIPTION',
      image: 'assets/images/organizing.png',
      link: '/#',
    },
    {
      title: 'HOME_PAGE.WHAT_WE_DO.SERVICES.ITEM3.TITLE',
      description: 'HOME_PAGE.WHAT_WE_DO.SERVICES.ITEM3.DESCRIPTION',
      image: 'assets/images/unpacking.png',
      link: '#',
    },
  ];
}
