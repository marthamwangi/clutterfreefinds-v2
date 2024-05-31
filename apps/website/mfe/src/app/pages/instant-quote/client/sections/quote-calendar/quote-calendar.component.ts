import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var Datepicker: any;

interface ITime {
  value: string;
  label: string;
}
@Component({
  selector: 'iq-quote-calendar',
  standalone: true,
  imports: [NgFor, FormsModule, AsyncPipe, NgIf, DatePipe],
  templateUrl: './quote-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: 'true' },
})
export class QuoteCalendarComponent implements OnInit {
  @Output() selectedDateTime$ = new EventEmitter<any>();
  @Input() dateTime!: Date;
  @ViewChild('dateField', { static: true }) dateField!: ElementRef;
  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  public dataDate!: string;
  public selectedDate!: Date;
  public selectedTime: any;
  public timePicker: Array<ITime>;

  private formatter = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  constructor() {
    this.timePicker = [
      {
        value: '09:00',
        label: '09:00 AM',
      },
      {
        value: '09:30',
        label: '09:30 AM',
      },
      {
        value: '10:00',
        label: '10:00 AM',
      },
      {
        value: '10:30',
        label: '10:30 AM',
      },
      {
        value: '11:00',
        label: '11:00 AM',
      },
      {
        value: '11:30',
        label: '11:30 AM',
      },
      {
        value: '12:00',
        label: '12:00 PM',
      },
      {
        value: '12:30',
        label: '12:30 PM',
      },
      {
        value: '01:00',
        label: '01:00 PM',
      },
      {
        value: '01:30',
        label: '01:30 PM',
      },
      {
        value: '02:00 ',
        label: '02:00 PM',
      },
      {
        value: '02:30',
        label: '02:30 PM',
      },
      {
        value: '03:00',
        label: '03:00 PM',
      },
      {
        value: '03:30',
        label: '03:30 PM',
      },
      {
        value: '04:00',
        label: '04:00 PM',
      },
      {
        value: '04:30',
        label: '04:30 PM',
      },
    ];
  }
  ngOnInit(): void {
    this.selectedDate = this.dateTime;
    this.dataDate = this.formatter.format(this.dateTime);
    this._setTimeSelected(this.dateTime);
    this.initDatePicker();
  }

  public _commonChangeDetector(): void {
    this._changeDetectorRef.detectChanges();
  }

  initDatePicker(): void {
    new Datepicker(this.dateField.nativeElement, {
      minDate: new Date(),
      todayHighlight: true,
      daysOfWeekDisabled: [0],
      title: 'Pick a Date',
      //if time is picked from the db strikethrough it
      // datesDisabled:[] booked dates
    });
  }

  onDatePicked(e: any) {
    this.selectedDate = new Date(e.detail.date);
    this.dataDate = this.formatter.format(new Date(this.selectedDate));
    this._commonChangeDetector();
  }
  onTimePicked($event: string) {
    const time = $event;
    this.selectedTime = time;
    //if time is picked from the db strikethrough it
    this._formatDate(time);
  }

  private _setTimeSelected(date: Date) {
    this.selectedTime = new Date(date).toTimeString().slice(0, 5);
  }

  private _formatDate(time: string) {
    console.log('time', time);
    var timeParts = time
      .split(':')
      .map((timePartString) => parseInt(timePartString));

    let date = this.selectedDate;
    let format = date.setHours(timeParts[0], timeParts[1]);

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
