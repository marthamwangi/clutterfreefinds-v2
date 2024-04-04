import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'sa-content-section',
  standalone: true,
  imports: [TranslateModule, NgFor],
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.scss'],
})
export class ContentSectionComponent {
  public contentArray: Array<any> = [
    {
      title: 'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_1.TITLE',
      description_1:
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_1.DESCRIPTION1',
    },
    {
      title: 'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_2.TITLE',
      description_1:
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_2.DESCRIPTION1',
    },
    {
      title: 'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_3.TITLE',
      description_1:
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_3.DESCRIPTION1',
    },
    {
      title: 'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_4.TITLE',
      description_1:
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_4.DESCRIPTION1',
    },
    {
      title: 'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_5.TITLE',
      description_1:
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_5.DESCRIPTION1',
    },
    {
      title: 'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_6.TITLE',
      description_1:
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_6.DESCRIPTION1',
    },
    {
      title: 'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_7.TITLE',
      description_1:
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_7.DESCRIPTION1',
    },
    {
      title: 'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_8.TITLE',
      description_1:
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_8.DESCRIPTION1',
    },
    {
      title: 'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_9.TITLE',
      description_1:
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_9.DESCRIPTION1',
    },
    {
      title: 'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_10.TITLE',
      description_1:
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_10.DESCRIPTION1',
      description_2:
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_10.DESCRIPTION2',
      list1: [
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_10.LIST_1.BULLET_POINT_1',
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_10.LIST_1.BULLET_POINT_2',
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_10.LIST_1.BULLET_POINT_3',
      ],
    },
    {
      title: 'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_11.TITLE',
      description_1:
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_11.DESCRIPTION1',
    },
    {
      title: 'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_12.TITLE',
      description_1:
        'SERVICE_AGREEMENT_PAGE.CONTENT_SECTION.CONTENT_12.DESCRIPTION1',
    },
  ];
}