import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { take } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
// var Tooltip = require('bootstrap');
import * as bootstrap from 'bootstrap';
export const CFF_SOCIAL_ACCOUNTS = {
  FACEBOOK: 'https://www.facebook.com/clutter.free.finds.fb/',
  INSTAGRAM: 'https://www.instagram.com/clutterfreefinds/',
  TIKTOK: 'https://www.tiktok.com/@clutterfreefinds',
};
export const GOOGLE_BUSINESS_PROFILE =
  'https://maps.app.goo.gl/K6VBPGG1ghWex2TX9';
export const CFF_WHATS_APP_LINK = 'wa.me/+254706347399';

@Component({
  selector: 'cff-v2-footer',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @ViewChild('tooltipRef', { static: false })
  private tooltipRef!: ElementRef<HTMLDivElement>;

  private _bootstrapTooltipRef: any;

  APP_URL = 'clutterfreefinds';
  newsletterProgress = false;
  newsletterMessage = '';
  CFF_SOCIAL_ACCOUNTS = CFF_SOCIAL_ACCOUNTS;
  public emailTooltip: string = 'FOOTER.EMAIL_TOOLTIP';
  public footerLinks = [
    {
      title: 'FOOTER.PAGES.COMPANY.TITLE',
      list: [
        {
          text: 'FOOTER.PAGES.COMPANY.LIST.ITEM1',
          link: '/about-us',
        },
        {
          text: 'FOOTER.PAGES.COMPANY.LIST.ITEM2',
          link: '/become-a-partner',
        },
      ],
    },
    {
      title: 'FOOTER.PAGES.FOR_CLIENTS.TITLE',
      list: [
        {
          text: 'FOOTER.PAGES.FOR_CLIENTS.LIST.ITEM1',
          link: '/request-quote',
        },
        {
          text: 'FOOTER.PAGES.FOR_CLIENTS.LIST.ITEM2',
          link: '/service-agreement',
        },
      ],
    },
    {
      title: 'FOOTER.PAGES.PRICING.TITLE',
      list: [
        {
          text: 'FOOTER.PAGES.PRICING.LIST.ITEM1',
          link: '/pricing',
        },
      ],
    },
    {
      title: 'FOOTER.PAGES.DATA.TITLE',
      list: [
        {
          text: 'FOOTER.PAGES.DATA.LIST.ITEM1',
          link: '/service-agreement',
        },
        {
          text: 'FOOTER.PAGES.DATA.LIST.ITEM2',
          link: '/privacy-policy',
        },
      ],
    },
  ];
  public footerCTA = [
    {
      image: 'letter-unread',
      title: 'FOOTER.CTA_LINKS.EMAIL.TITLE',
      content: 'FOOTER.CTA_LINKS.EMAIL.CONTENT',
    },
    {
      image: 'whatsapp',
      link: CFF_WHATS_APP_LINK,
      title: 'FOOTER.CTA_LINKS.WHATSAPP.TITLE',
      content: 'FOOTER.CTA_LINKS.WHATSAPP.CONTENT',
    },
    {
      image: 'dialog',
      link: this.APP_URL + '/contact-us',
      title: 'FOOTER.CTA_LINKS.CONTACT_US.TITLE',
      content: 'FOOTER.CTA_LINKS.CONTACT_US.CONTENT',
    },
    {
      image: 'map-point-wave',
      link: GOOGLE_BUSINESS_PROFILE,
      title: 'FOOTER.CTA_LINKS.LOCATION.TITLE',
      content: 'FOOTER.CTA_LINKS.LOCATION.CONTENT',
    },
  ];
  newsletterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor() {} // private crudService: CrudService // private readonly translateService: TranslateService, // private toastrService: ToastrService,
  subscribeToNewsletter() {}
  // subscribeToNewsletter() {
  //   if (!this.newsletterForm.valid) return;
  //   this.newsletterProgress = true;
  //   this.crudService
  //     .post(BASE_API + MS_USER + USER + SUBSCRIBE_NEWSLETTER, {
  //       email: this.newsletterForm.value.email,
  //     })
  //     .subscribe({
  //       next: (response: any) => {
  //         this.newsletterProgress = false;
  //         if (response.success) {
  //           this.subscribeSuccess();
  //         } else {
  //           this.subscribeFailed();
  //         }
  //       },
  //       error: () => {
  //         this.newsletterProgress = false;
  //         this.subscribeFailed();
  //       },
  //     });
  // }

  // subscribeSuccess() {
  //   const msgSuccessDesc = this.translateService.instant(
  //     'sharedSections.footerSection.NEWSLETTER.TOASTS.SUCCESS.DESCRIPTION'
  //   );
  //   const msgSuccessTitle = this.translateService.instant(
  //     'sharedSections.footerSection.NEWSLETTER.TOASTS.SUCCESS.TITLE'
  //   );
  //   this.newsletterMessage = msgSuccessDesc;
  //   this.toastrService.success(msgSuccessDesc, msgSuccessTitle, {
  //     closeButton: true,
  //   });
  //   this.resetMessage();
  // }

  // subscribeFailed() {
  //   const msgFailedDesc = this.translateService.instant(
  //     'sharedSections.footerSection.NEWSLETTER.TOASTS.FAIL.DESCRIPTION'
  //   );
  //   const msgFailedTitle = this.translateService.instant(
  //     'sharedSections.footerSection.NEWSLETTER.TOASTS.FAIL.TITLE'
  //   );
  //   this.newsletterMessage = msgFailedDesc;
  //   this.toastrService.error(msgFailedDesc, msgFailedTitle, {
  //     closeButton: true,
  //   });
  //   this.resetMessage();
  // }

  // resetMessage() {
  //   setTimeout(() => {
  //     this.newsletterMessage = '';
  //   }, 5000);
  // }

  copyToClipboard(): void {
    if (!this._bootstrapTooltipRef) {
      this._bootstrapTooltipRef = new bootstrap.Tooltip(
        this.tooltipRef.nativeElement
      );
    }
    navigator.clipboard.writeText('clutterfreefinds@gmail.com').then(() => {
      this.emailTooltip = 'FOOTER.EMAIL_TOOLTIP_COPIED';
      this._bootstrapTooltipRef.show();
      setTimeout(() => {
        this._bootstrapTooltipRef.hide();
      }, 2000);
      this._bootstrapTooltipRef._tooltipInstance
        ?.afterHidden()
        .pipe(take(1))
        .subscribe({
          complete: () => {
            this.emailTooltip = 'sharedSections.footerSection.email-tooltip';
          },
        });
    });
  }
}
