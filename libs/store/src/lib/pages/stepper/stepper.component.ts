import {
  EventEmitter,
  ContentChildren,
  QueryList,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { OrderComponent } from '../order/order.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { PaymentComponent } from '../payment/payment.component';
import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AppState,
  CART_STORAGE_KEY,
  REGEX_EMAIL,
} from '@clutterfreefinds-v2/globals';
import { Observable, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { IProduct } from '../../data/store.model';
import { fromCartSelector } from '../cart/data/cart.selectors';

interface Step {
  label: number;
  key: string;
  title: string;
  status: 'active' | 'disabled' | 'completed';
}

@Component({
  selector: 'sc-stepper',
  templateUrl: './stepper.component.html',
  standalone: true,
  imports: [
    CartComponent,
    OrderComponent,
    CheckoutComponent,
    PaymentComponent,
    NgTemplateOutlet,
    RouterLink,
    NgIf,
    NgFor,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  @ViewChild('cartEmptyTemplate', { static: true })
  private cartEmptyTemplateRef!: TemplateRef<any>;
  @ViewChild('cartNotEmptyTemplate', { static: true })
  private cartNotEmptyTemplateRef!: TemplateRef<any>;
  @ViewChild('cartTemplate', { static: true })
  private cartTemplateRef!: TemplateRef<any>;
  @ViewChild('checkoutTemplate') private checkoutTemplateRef!: TemplateRef<any>;
  @ViewChild('paymentTemplate') private paymentTemplateRef!: TemplateRef<any>;
  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  #store: Store<AppState> = inject(Store);

  public currentStepIndex: number;
  public renderedSteps: Array<Step>;
  public currentStep: Step | null = null;
  public steps!: { [step: number]: Step };

  public processCartForm: FormGroup = new FormGroup({
    cart: new FormControl([], Validators.required),
    buyerDetails: new FormGroup({
      county: new FormControl('', Validators.required),
      constituency: new FormControl('', Validators.required),
      ward: new FormControl('', Validators.required),
      address: new FormControl(''),
      hseNumber: new FormControl(''),
      fname: new FormControl('', [Validators.required]),
      phone: new FormControl('', Validators.required),
      deliveryMethod: new FormControl('', Validators.required),
    }),
  });

  cartProducts$: Observable<Array<IProduct>>;

  constructor() {
    this.cartProducts$ = this.#store.select(
      fromCartSelector.selectCartProductsList
    );
    this.currentStepIndex = 0;
    this.renderedSteps = [];
    this.steps = {
      0: {
        key: 'cart',
        label: 1,
        title: 'Cart',
        status: 'active',
      },
      1: {
        key: 'checkout',
        label: 2,
        title: 'Checkout',
        status: 'disabled',
      },
      2: {
        key: 'payment',
        label: 3,
        title: 'Payment',
        status: 'disabled',
      },
    };
  }

  public returnStepsTemplate(): TemplateRef<any> {
    const templateMap: any = {
      0: this.cartTemplateRef,
      1: this.checkoutTemplateRef,
      2: this.paymentTemplateRef,
    };
    return templateMap[this.currentStepIndex];
  }

  public returnViewTemplate(): TemplateRef<any> {
    let cart = [];
    this.cartProducts$.subscribe({
      next: (products: Array<IProduct>) => {
        cart = products;
      },
    });
    if (cart.length === 0) {
      return this.cartEmptyTemplateRef;
    } else {
      return this.cartNotEmptyTemplateRef;
    }
  }
  ngAfterViewInit(): void {
    this._createRenderedSteps();
    this._commonChangeDetector();
  }
  public _commonChangeDetector(): void {
    this._changeDetectorRef.detectChanges();
  }
  private _createRenderedSteps() {
    for (const key in this.steps) {
      this.renderedSteps.push(this.steps[key]);
      if (this.currentStepIndex === parseInt(key)) {
        this.currentStep = this.renderedSteps[this.currentStepIndex];
        this.currentStep.status = 'active';
      }
    }
  }

  goNext() {
    if (this.currentStepIndex === this.renderedSteps.length - 1) {
      return;
    }
    this.currentStepIndex = this.currentStepIndex + 1;
    this.renderedSteps.forEach((step, index) => {
      if (index === this.currentStepIndex) {
        step.status = 'active';
        this.currentStep = step;
      } else if (
        index < this.currentStepIndex &&
        this.paymentProcessForm(this.steps[index].key)?.valid
      ) {
        step.status = 'completed';
        this.currentStep = step;
      } else {
        step.status = 'disabled';
        this.currentStep = step;
      }
    });
  }

  goBack() {
    if (this.currentStepIndex === this.renderedSteps.length) {
      return;
    }
    this.currentStepIndex -= 1;
    this.renderedSteps.forEach((step, index) => {
      if (index === this.currentStepIndex) {
        step.status = 'active';
        this.currentStep = step;
      } else if (
        index < this.currentStepIndex &&
        this.paymentProcessForm(this.steps[index].key)?.valid
      ) {
        step.status = 'completed';
        this.currentStep = step;
      } else {
        step.status = 'disabled';
        this.currentStep = step;
      }
    });
  }
  paymentProcessForm(key: any): any {
    return this.processCartForm.get(key);
  }

  processOrder() {}
}
