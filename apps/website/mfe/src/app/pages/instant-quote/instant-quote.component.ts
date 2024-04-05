import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuoteServiceComponent } from './client/sections/quote-service/quote-service.component';
import { ICffService } from './models/cffSservice.model';
import { QuoteSpaceComponent } from './client/sections/quote-space/quote-space.component';
import { ISpaceModel } from './models/space.model';
import { QuoteProductComponent } from './client/sections/quote-product/quote-product.component';
import { IMaterialModel } from './models/material.model';
import { BehaviorSubject } from 'rxjs';
import { NgIf } from '@angular/common';

interface IPriceRange {
  minPrice: number;
  maxPrice: number;
}
@Component({
  selector: 'iq-instant-quote',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    QuoteServiceComponent,
    QuoteSpaceComponent,
    QuoteProductComponent,
    NgIf,
  ],
  templateUrl: './instant-quote.component.html',
  styleUrls: ['./instant-quote.component.scss'],
})
export class InstantQuoteComponent {
  private _priceCalculator$: BehaviorSubject<IPriceRange> =
    new BehaviorSubject<IPriceRange>({
      minPrice: 0,
      maxPrice: 0,
    });
  private _serviceSelected!: ICffService;
  public spaceSelected!: ISpaceModel;
  public _selectedMaterial!: IMaterialModel;

  public minPrice!: string;
  public maxPrice!: string;

  ngOnInit() {
    this._priceCalculator$.pipe().subscribe({
      next: (price: any) => {
        this.minPrice = this._formatPriceToString(price.minPrice);
        this.maxPrice = this._formatPriceToString(price.maxPrice);
      },
    });
  }
  //onDestroy to take until unsubscribe

  getService($event: ICffService): void {
    this._serviceSelected = $event;
    this._calculatePriceServiceRange($event, 1);
  }

  getSpace($event: ISpaceModel): void {
    this.spaceSelected = $event;
    this._calculatePriceSpaceRange($event);
  }

  getMaterial($event: IMaterialModel) {
    this._resetPrices();
    this._selectedMaterial = $event;
    this._calculatePriceMAterialRange($event);
  }

  private _calculatePriceServiceRange(service: ICffService, hours: number) {
    const minPrice = service.price * hours;
    const maxPrice = service.price * hours;
    this._priceCalculator$.next({
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  }

  private _calculatePriceSpaceRange(space: ISpaceModel) {
    const minPrice = space.minHours * this._serviceSelected.price;
    const maxPrice = space.maxHours * this._serviceSelected.price;
    this._priceCalculator$.next({
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  }

  private _calculatePriceMAterialRange(material: IMaterialModel) {
    if (material.percentagePrice > 1) {
      const minPrice =
        ((100 + material.percentagePrice) *
          (this.spaceSelected.minHours * this._serviceSelected.price)) /
        100;
      const maxPrice =
        ((100 + material.percentagePrice) *
          (this.spaceSelected.maxHours * this._serviceSelected.price)) /
        100;
      this._priceCalculator$.next({
        minPrice: minPrice,
        maxPrice: maxPrice,
      });
    } else {
      this._resetPrices();
    }
  }

  private _resetPrices() {
    const minPrice = this.spaceSelected.minHours * this._serviceSelected.price;
    const maxPrice = this.spaceSelected.maxHours * this._serviceSelected.price;
    this._priceCalculator$.next({
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  }

  private _formatPriceToString(price: number) {
    return Intl.NumberFormat('KES', {
      style: 'currency',
      currency: 'KES',
    }).format(price);
  }
}
