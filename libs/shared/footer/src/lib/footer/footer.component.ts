import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import * as bootstrap from 'bootstrap';
import {
  CFF_SOCIAL_ACCOUNTS,
  CFF_WHATS_APP_LINK,
  GOOGLE_BUSINESS_PROFILE,
  WEB_APP_EMAIL_SUBSCRIBER_LIST,
} from '@clutterfreefinds-v2/globals';
import { FooterService } from './footer.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'clutterfreefinds-v2-footer',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, NgFor, NgIf, AsyncPipe],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('tooltipRef', { static: false })
  private tooltipRef!: ElementRef<HTMLDivElement>;

  @ViewChild('toastRef', { static: false })
  private toastRef!: ElementRef<HTMLDivElement>;

  private _bootstrapTooltipRef: any;
  private _boostrapToastRef: any;

  APP_URL = 'clutterfreefinds';
  newsletterProgress = false;
  public newsletterMessage = '';
  public newsletterTitle = '';
  public CFF_SOCIAL_ACCOUNTS = CFF_SOCIAL_ACCOUNTS;
  public emailTooltip$: BehaviorSubject<any> = new BehaviorSubject(
    'FOOTER.EMAIL_TOOLTIP'
  );
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

  constructor(private _newsLetterService: FooterService) {}
  ngAfterViewInit(): void {
    if (!this._boostrapToastRef) {
      this._boostrapToastRef = new bootstrap.Toast(
        this.toastRef.nativeElement,
        {
          autohide: true,
          animation: true,
        }
      );
    }

    if (!this._bootstrapTooltipRef) {
      this._bootstrapTooltipRef = new bootstrap.Tooltip(
        this.tooltipRef.nativeElement,
        {
          delay: 500,
          animation: true,
        }
      );
    }
  }
  public subscribeToNewsletter() {
    if (!this.newsletterForm.valid) return;
    this.newsletterProgress = true;
    this._newsLetterService
      .newsLetterService(WEB_APP_EMAIL_SUBSCRIBER_LIST, {
        email: this.newsletterForm.value.email,
      })
      .subscribe({
        next: (response: any) => {
          this.newsletterProgress = false;
          if (response.success) {
            this.subscribeSuccess();
          }
        },
        error: (error: any) => {
          this.newsletterProgress = false;
          this.subscribeFailed(error.message);
        },
      });
  }

  subscribeSuccess() {
    this._boostrapToastRef.show();
    const msgSuccessTitle = 'FOOTER.NEWSLETTER.TOASTS.SUCCESS.TITLE';
    const msgSuccessDesc = 'FOOTER.NEWSLETTER.TOASTS.SUCCESS.DESCRIPTION';
    this.newsletterTitle = msgSuccessTitle;
    this.newsletterMessage = msgSuccessDesc;
    this.resetSubscribeMessage();
  }

  subscribeFailed(error: any) {
    this._boostrapToastRef.show();
    const msgFailedTitle = 'FOOTER.NEWSLETTER.TOASTS.FAIL.TITLE';
    this.newsletterTitle = msgFailedTitle;
    this.newsletterMessage = error;
    this.resetSubscribeMessage();
  }

  resetSubscribeMessage() {
    setTimeout(() => {
      this.newsletterMessage = '';
      this._boostrapToastRef.hide();
    }, 5000);
  }

  copyToClipboard(): void {
    this._bootstrapTooltipRef.show();
    navigator.clipboard.writeText('clutterfreefinds@gmail.com').then(() => {
      this.emailTooltip$.next('FOOTER.EMAIL_TOOLTIP_COPIED');
      this.resetCopyToClipboard();
    });
  }

  resetCopyToClipboard() {
    setTimeout(() => {
      this.emailTooltip$.next('FOOTER.EMAIL_TOOLTIP');
      this._bootstrapTooltipRef.hide();
    }, 5000);
  }
}
