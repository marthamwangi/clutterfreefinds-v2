import { Component, Input, SimpleChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { QuoteServiceComponent } from './components/quote-service/quote-service.component';

@Component({
  selector: 'iq-instant-quote',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, QuoteServiceComponent],
  templateUrl: './instant-quote.component.html',
  styleUrls: ['./instant-quote.component.scss'],
})
export class InstantQuoteComponent {
  @Input() serviceTpe: string | undefined;

  public hoursControl: FormControl = new FormControl(1);

  constructor() {
    this.hoursControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((hours) => {
        if (hours < 1) hours = 1;
        console.log('hours', hours);
      });
  }

  updateQuantity(int: number) {
    this.hoursControl.patchValue(+int);
  }
}
