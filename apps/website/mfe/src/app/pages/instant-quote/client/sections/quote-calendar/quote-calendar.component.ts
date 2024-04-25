import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AsyncPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ITime {
  value: Array<number>;
  label: string;
}
@Component({
  selector: 'iq-quote-calendar',
  standalone: true,
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatMomentDateModule,
    NgFor,
    FormsModule,
    AsyncPipe,
  ],
  providers: [MatNativeDateModule],
  templateUrl: './quote-calendar.component.html',
  styleUrls: ['./quote-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteCalendarComponent implements OnInit {
  @Output() selectedDateTime$ = new EventEmitter<any>();
  @Input() dateTime!: Date;

  public selectedDate!: Date;
  public minDate: Date = new Date();
  public selectedTime: any;

  // public minDate
  public timePicker: Array<ITime>;
  constructor() {
    this.timePicker = [
      {
        value: [9, 0, 0],
        label: '9:00 AM',
      },
      {
        value: [9, 30, 0],
        label: '9:30 AM',
      },
      {
        value: [10, 0, 0],
        label: '10:00 AM',
      },
      {
        value: [10, 30, 0],
        label: '10:30 AM',
      },
      {
        value: [11, 0, 0],
        label: '11:00 AM',
      },
      {
        value: [11, 30, 0],
        label: '11:30 AM',
      },
      {
        value: [12, 0, 0],
        label: '12:00 PM',
      },
      {
        value: [12, 30, 0],
        label: '12:30 PM',
      },
      {
        value: [1, 0, 0],
        label: '1:00 PM',
      },
      {
        value: [1, 30, 0],
        label: '1:30 PM',
      },
      {
        value: [2, 0, 0],
        label: '2:00 PM',
      },
      {
        value: [2, 30, 0],
        label: '2:30 PM',
      },
      {
        value: [3, 0, 0],
        label: '3:00 PM',
      },
      {
        value: [3, 30, 0],
        label: '3:30 PM',
      },
      {
        value: [4, 0, 0],
        label: '4:00 PM',
      },
      {
        value: [4, 30, 0],
        label: '4:30 PM',
      },
    ];
  }
  ngOnInit(): void {
    this.selectedDate = this.dateTime;
    this.selectedTime = this.dateTime?.getTime();
    this._formatTime(this.dateTime);
  }

  onDatePicked($event: any) {
    //if time is picked from the db strikethrough it
    this.selectedDate = new Date($event._d);
  }
  onTimePicked($event: Array<number>) {
    const time = $event;
    this.selectedTime = time;
    //if time is picked from the db strikethrough it
    this._formatDate(time);
  }

  private _formatTime(date: Date) {
    let valuesArr: number[] = [];
    let hours = date?.getHours();
    let minutes = date?.getMinutes();
    valuesArr.push(hours);
    valuesArr.push(minutes);
    valuesArr.push(0);

    /**
     * find the timepicker with values given
     * if hours is less than 12 -> AM else ->pm
     * append values and labels
     */

    let time = this.timePicker.find(
      (time: ITime) => time.value.toString() === valuesArr.toString()
    );
    this.selectedTime = time;
  }

  private _formatDate(time: any) {
    let date = this.selectedDate;
    let format = date.setHours(time[0], time[1], 0);
    var d = new Date();
    d.setTime(format);
    d.toDateString();
    this.selectedDate = d;
    this._setQuotationDate(d);
  }

  private _setQuotationDate(date: any): void {
    this.selectedDateTime$.emit(new Date(date));
  }
}
