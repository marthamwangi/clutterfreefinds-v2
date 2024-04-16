import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgFor } from '@angular/common';

@Component({
  selector: 'iq-quote-calendar',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, MatMomentDateModule, NgFor],
  providers: [MatNativeDateModule],
  templateUrl: './quote-calendar.component.html',
  styleUrls: ['./quote-calendar.component.scss'],
})
export class QuoteCalendarComponent {
  public selectedDate!: Date;
}
