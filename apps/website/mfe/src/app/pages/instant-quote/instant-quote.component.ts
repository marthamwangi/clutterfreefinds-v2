import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuoteServiceComponent } from './client/sections/quote-service/quote-service.component';
import { ICffService } from './models/cffSservice.model';
import { QuoteSpaceComponent } from './client/sections/quote-space/quote-space.component';
import { ISpaceModel } from './models/space.model';
@Component({
  selector: 'iq-instant-quote',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    QuoteServiceComponent,
    QuoteSpaceComponent,
  ],
  templateUrl: './instant-quote.component.html',
  styleUrls: ['./instant-quote.component.scss'],
})
export class InstantQuoteComponent {
  serviceSelected: ICffService = {
    name: '',
    price: 0,
    description: '',
    label: '',
  };

  spaceSelected: ISpaceModel = {
    name: '',
    maxHours: 0,
    minHours: 0,
  };

  constructor() {}

  getPricingPerHour($event: ICffService): void {
    this.serviceSelected = $event;
  }

  getMAxMinHours($event: ISpaceModel): void {
    this.spaceSelected = $event;
  }
}
