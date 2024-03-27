import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  APP_URL,
  BASE_API,
  CFF_SOCIAL_ACCOUNTS,
  CFF_WHATS_APP_LINK,
  EMAIL,
  GOOGLE_BUSINESS_PROFILE,
  WEB_APP_NEWSLETTER,
} from '@clutterfreefinds-v2/globals';
import { FooterService } from './footer.service';
import { BehaviorSubject, take } from 'rxjs';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'clutterfreefinds-v2-footer',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    AsyncPipe,
    MatTooltipModule,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @ViewChild('tooltipRef', { static: false })
  private _tooltipRef!: MatTooltip;

  APP_URL = APP_URL;
  BASE_API = BASE_API;
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
          link: '/about',
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

  constructor(
    private _toastrService: ToastrService,
    private _newsLetterService: FooterService,
    private readonly _translateService: TranslateService
  ) {}

  public subscribeToNewsletter() {
    if (!this.newsletterForm.valid) return;
    this.newsletterProgress = true;
    this._newsLetterService
      /**
       * Disable button to prevent overpostings
       */
      .newsLetterService(
        `${BASE_API}/${WEB_APP_NEWSLETTER}`,
        {
          email: this.newsletterForm.value.email,
        },
        {}
      )
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
    const msgSuccessTitle = this._translateService.instant(
      'FOOTER.NEWSLETTER.TOASTS.SUCCESS.TITLE'
    );
    const msgSuccessDesc = this._translateService.instant(
      'FOOTER.NEWSLETTER.TOASTS.SUCCESS.DESCRIPTION'
    );
    this.newsletterTitle = msgSuccessTitle;
    this.newsletterMessage = msgSuccessDesc;
    this._toastrService.success(msgSuccessDesc, msgSuccessTitle, {
      positionClass: 'toast-bottom-right',
    });
    this.resetSubscribeMessage();
  }

  subscribeFailed(error: any) {
    const msgFailedTitle = this._translateService.instant(
      'FOOTER.NEWSLETTER.TOASTS.FAIL.TITLE'
    );
    this.newsletterTitle = msgFailedTitle;
    this.newsletterMessage = error;
    this._toastrService.error(error, msgFailedTitle, {
      positionClass: 'toast-bottom-right',
    });
    this.resetSubscribeMessage();
  }

  resetSubscribeMessage() {
    setTimeout(() => {
      this.newsletterMessage = '';
    }, 5000);
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(EMAIL).then(() => {
      this.emailTooltip$.next('FOOTER.EMAIL_TOOLTIP_COPIED');
      this._tooltipRef.show();
      // setTimeout(() => {
      //   this._tooltipRef.hide();
      // }, 2000);
      this._tooltipRef._tooltipInstance
        ?.afterHidden()
        .pipe(take(1))
        .subscribe({
          complete: () => {
            this._resetCopyToClipboard();
          },
        });
    });
  }
  private _resetCopyToClipboard() {
    setTimeout(() => {
      this.emailTooltip$.next('FOOTER.EMAIL_TOOLTIP');
    }, 5000);
  }
}
