import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuoteServiceComponent } from './client/sections/quote-service/quote-service.component';
import { ICffService } from './models/cffSservice.model';
@Component({
  selector: 'iq-instant-quote',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, QuoteServiceComponent],
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
  constructor() {}

  getMAxMinHours($event: ICffService): void {
    this.serviceSelected = $event;
  }
}
