import {
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CFF_WHATS_APP_CONTACT_US } from '@clutterfreefinds-v2/globals';
import { TranslateModule } from '@ngx-translate/core';

interface Price {
  package: string;
  hourly: string;
}
interface Description {
  title?: string;
  price?: Price;
  type: 'string' | 'price' | '';
}
interface TableData {
  rowHeader: string;
  rowData: Array<
    | any
    | ''
    | 'string'
    | 'check'
    | 'link'
    | 'grey-badge'
    | 'green-badge'
    | 'blue-badge'
    | 'gold-badge'
    | 'any-badge'
  >;
}
interface IPricingHeader {
  plan: Array<string>;
  description: Array<Description>;
  action: Array<{
    type?: 'button' | 'toggle';
    content?: Price;
    button?: string;
    pricingType?: string;
  }>;
}

@Component({
  selector: 'wc-pricing-table',
  standalone: true,
  imports: [
    TranslateModule,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgIf,
    FormsModule,
  ],
  templateUrl: './pricing-table.component.html',
  styleUrls: ['./pricing-table.component.scss'],
})
export class PricingTableComponent {
  @Input() isPackage!: boolean;
  @Input() plan!: string;

  @ViewChild('wcPricingTableHead', { static: true })
  private _wcPricingTableHead!: ElementRef<HTMLDivElement>;
  @ViewChild('wsPricingTableBody', { static: true })
  private _wsPricingTableBody!: ElementRef<HTMLDivElement>;

  private _intersetionObserverRef!: IntersectionObserver;

  private _hasRegisteredInitial: boolean = false;

  public pricingTableHeader: Array<IPricingHeader> = [
    {
      plan: [
        'PRICING_PAGE.PRICING_TABLE.HEADER.PLAN.TH_1',
        'PRICING_PAGE.PRICING_TABLE.HEADER.PLAN.TH_2',
        'PRICING_PAGE.PRICING_TABLE.HEADER.PLAN.TH_3',
        'PRICING_PAGE.PRICING_TABLE.HEADER.PLAN.TH_4',
        'PRICING_PAGE.PRICING_TABLE.HEADER.PLAN.TH_5',
        'PRICING_PAGE.PRICING_TABLE.HEADER.PLAN.TH_6',
      ],
      description: [
        {
          type: 'string',
          title: 'PRICING_PAGE.PRICING_TABLE.HEADER.DESCRIPTION.TH_1',
        },
        {
          type: 'price',
          price: {
            package: 'KES10,000',
            hourly: 'KSH500',
          },
        },
        {
          type: 'price',
          price: {
            package: 'KES15,000',
            hourly: 'KSH700',
          },
        },
        {
          type: 'price',
          price: {
            package: 'KSH25,000',
            hourly: 'KSH1000',
          },
        },
        {
          type: 'price',
          price: {
            package: 'KSH35,000',
            hourly: 'KSH1200',
          },
        },
        {
          type: 'price',
          price: {
            package: '+ KSH.35,000',
            hourly: 'KSH1500',
          },
        },
      ],
      action: [
        {
          type: 'toggle',
          content: {
            package: 'PRICING_PAGE.PRICING_TABLE.HEADER.ACTION.TH_1.PACKAGE',
            hourly: 'PRICING_PAGE.PRICING_TABLE.HEADER.ACTION.TH_1.HOURLY',
          },
        },
        {},
        {
          type: 'button',
          button: 'PRICING_PAGE.PRICING_TABLE.HEADER.ACTION.TH_3',
          pricingType: 'Standard',
        },
        {
          type: 'button',
          button: 'PRICING_PAGE.PRICING_TABLE.HEADER.ACTION.TH_4',
          pricingType: 'Ultimate',
        },

        {
          type: 'button',
          button: 'PRICING_PAGE.PRICING_TABLE.HEADER.ACTION.TH_5',
          pricingType: 'Professional',
        },
        {
          type: 'button',
          button: 'PRICING_PAGE.PRICING_TABLE.HEADER.ACTION.TH_6',
        },
      ],
    },
  ];
  public pricingTableBody: Array<TableData> = [
    {
      rowHeader: 'PRICING_PAGE.PRICING_TABLE.BODY.ROW_1.TH_1',
      rowData: [
        'PRICING_PAGE.PRICING_TABLE.BODY.ROW_1.TD.TEXT_1',
        'PRICING_PAGE.PRICING_TABLE.BODY.ROW_1.TD.TEXT_2',
        'PRICING_PAGE.PRICING_TABLE.BODY.ROW_1.TD.TEXT_3',
        'PRICING_PAGE.PRICING_TABLE.BODY.ROW_1.TD.TEXT_4',
        'PRICING_PAGE.PRICING_TABLE.BODY.ROW_1.TD.TEXT_5',
      ],
    },
    {
      rowHeader: 'PRICING_PAGE.PRICING_TABLE.BODY.ROW_2.TH_1',
      rowData: ['check', 'check', 'check', 'check', 'check'],
    },
    {
      rowHeader: 'PRICING_PAGE.PRICING_TABLE.BODY.ROW_3.TH_1',
      rowData: ['check', 'check', 'check', 'check', 'check'],
    },
    {
      rowHeader: 'PRICING_PAGE.PRICING_TABLE.BODY.ROW_4.TH_1',
      rowData: ['check', 'check', 'check', 'check', 'check'],
    },
    {
      rowHeader: 'PRICING_PAGE.PRICING_TABLE.BODY.ROW_5.TH_1',
      rowData: ['check', 'check', 'check', 'check', 'check'],
    },
    {
      rowHeader: 'PRICING_PAGE.PRICING_TABLE.BODY.ROW_6.TH_1',
      rowData: [
        'grey-badge',
        'green-badge',
        'blue-badge',
        'gold-badge',
        'any-badge',
      ],
    },
    {
      rowHeader: 'PRICING_PAGE.PRICING_TABLE.BODY.ROW_7.TH_1',
      rowData: ['check', 'check', 'check', 'check', 'check'],
    },
    {
      rowHeader: 'PRICING_PAGE.PRICING_TABLE.BODY.ROW_8.TH_1',
      rowData: ['', '', '', 'check', 'check'],
    },
    {
      rowHeader: 'PRICING_PAGE.PRICING_TABLE.BODY.ROW_9.TH_1',
      rowData: ['', '', '', '', 'check'],
    },
  ];

  private _renderer2: Renderer2 = inject(Renderer2);

  ngOnInit() {
    this.triggerScrollAnimation();
  }

  ngOnDestroy(): void {
    this._intersetionObserverRef.disconnect();
  }

  updateScrollBody() {
    const scrollHead = this._wcPricingTableHead.nativeElement;
    const scrollBody = this._wsPricingTableBody.nativeElement;
    scrollHead.scrollLeft;
    scrollHead.scrollLeft = scrollBody.scrollLeft;
  }

  triggerScrollAnimation() {
    this._intersetionObserverRef = new IntersectionObserver(
      () => {
        if (this._hasRegisteredInitial) {
          const headerDimensions: DOMRect =
            this._wcPricingTableHead.nativeElement.getBoundingClientRect();
          if (headerDimensions.y <= 0) {
            this._addOrRemoveClassFromElement(
              'add',
              this._wcPricingTableHead.nativeElement,
              'sticky'
            );
          } else {
            this._addOrRemoveClassFromElement(
              'remove',
              this._wcPricingTableHead.nativeElement,
              'sticky'
            );
          }
        }
        {
          this._hasRegisteredInitial = true;
        }
      },
      {
        rootMargin: '100%',
        threshold: [1],
      }
    );
    this._intersetionObserverRef.observe(
      this._wcPricingTableHead.nativeElement
    );
  }

  private _addOrRemoveClassFromElement(
    action: 'add' | 'remove',
    elementRef: HTMLElement,
    className: string
  ): void {
    if (action === 'add') {
      this._renderer2.addClass(elementRef, className);
    } else {
      this._renderer2.removeClass(elementRef, className);
    }
  }

  redirectToWhatsapp() {
    const whatsappLink = CFF_WHATS_APP_CONTACT_US;
    window.open(whatsappLink, '_blank');
  }

  disabledPlanCheck(currentPlan: string, selectedPlan: string) {
    if (currentPlan && currentPlan.includes('Yearly')) {
      return selectedPlan.includes(currentPlan.split('-')[0]);
    }
    return currentPlan === selectedPlan;
  }
}
