import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
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
  AppState,
  BASE_API,
  CFF_SOCIAL_ACCOUNTS,
  CFF_WHATS_APP_CONTACT_US,
  CFF_WHATS_APP_LINK,
  GOOGLE_BUSINESS_PROFILE,
  IResponseModel,
  REGEX_EMAIL,
  WEB_API_INQUIRY_REQUEST,
  WEB_APP_NEWSLETTER,
} from '@clutterfreefinds-v2/globals';
import { FooterService } from './footer.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Modal } from 'flowbite';
import { Store } from '@ngrx/store';
import { fromFooterActions } from './data/footer.actions';
import { fromInquirySelector } from './data/footer.selectors';

@Component({
  selector: 'clutterfreefinds-v2-footer',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  #store: Store<AppState> = inject(Store);

  @ViewChild('emailPopupRef')
  private emailPopupRef!: ElementRef<HTMLDivElement>;
  private _sendEmailModal!: Modal;

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
          link: '/how-it-works',
        },
      ],
    },
    {
      title: 'FOOTER.PAGES.FOR_CLIENTS.TITLE',
      list: [
        {
          text: 'FOOTER.PAGES.FOR_CLIENTS.LIST.ITEM1',
          link: '/instant-quote',
        },
        {
          text: 'FOOTER.PAGES.FOR_CLIENTS.LIST.ITEM2',
          link: '/resources',
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
      link: this._sanitizer.bypassSecurityTrustUrl('javascript:void(0);'),
    },
    {
      image: 'whatsapp',
      link: CFF_WHATS_APP_LINK,
      title: 'FOOTER.CTA_LINKS.WHATSAPP.TITLE',
      content: 'FOOTER.CTA_LINKS.WHATSAPP.CONTENT',
    },
    {
      image: 'dialog',
      link: CFF_WHATS_APP_CONTACT_US,
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
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(REGEX_EMAIL),
    ]),
  });
  inquiryForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(REGEX_EMAIL),
    ]),
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });
  public inquiryProgress$: Observable<boolean>;
  public inquiryResponse$: Observable<IResponseModel>;
  constructor(
    private _toastrService: ToastrService,
    private _newsLetterService: FooterService,
    private readonly _translateService: TranslateService,
    private _sanitizer: DomSanitizer
  ) {
    this.inquiryProgress$ = this.#store.select(
      fromInquirySelector.LoadingSelector
    );
    this.inquiryResponse$ = this.#store.select(
      fromInquirySelector.ResponseSelector
    );
  }
  ngOnInit(): void {
    this._listenForInquiryResponse();
  }

  public subscribeToNewsletter() {
    if (!this.newsletterForm.valid) return;
    this.newsletterProgress = true;
    this._newsLetterService
      /**
       * Disable button to prevent overpostings
       * check if email is already added
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
      positionClass: 'toast-top-right',
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
      positionClass: 'toast-top-right',
    });
    this.resetSubscribeMessage();
  }

  resetSubscribeMessage() {
    setTimeout(() => {
      this.newsletterMessage = '';
    }, 5000);
  }

  public sendUsAnEmailPopUp(): void {
    const modalEl = this.emailPopupRef.nativeElement;
    this._sendEmailModal = new Modal(modalEl, {
      placement: 'center',
    });
    this._sendEmailModal.show();
  }
  public closeEmailPopup() {
    this._sendEmailModal.hide();
  }
  public sendInquiryRequest() {
    const inquiry = this.inquiryForm.value;
    this.#store.dispatch(
      fromFooterActions.InquiryRequest.inquiry({
        url: `${BASE_API}/${WEB_API_INQUIRY_REQUEST}`,
        inquiry,
      })
    );
  }
  private _listenForInquiryResponse() {
    this.inquiryResponse$.subscribe({
      next: (response: any) => {
        if (response.success) {
          this.inquiryRequestOnSuccess(response.message);
        }
      },
      error: (error: any) => {
        this.subscribeFailed(error.message);
      },
    });
  }
  inquiryRequestOnSuccess(success: any) {
    this.inquiryForm.reset();
    this._sendEmailModal.hide();
    const msgSuccessTitle = 'Well Received';
    const msgSuccessDesc = success;
    this._toastrService.success(msgSuccessDesc, msgSuccessTitle, {
      positionClass: 'toast-top-right',
    });
  }

  inquiryRequestOnError(error: any) {
    const msgSuccessTitle = 'Oh no!';
    const msgSuccessDesc = error;
    this._toastrService.success(msgSuccessDesc, msgSuccessTitle, {
      positionClass: 'toast-top-right',
    });
  }

  get email(): any {
    return this.newsletterForm.get('email');
  }
}
