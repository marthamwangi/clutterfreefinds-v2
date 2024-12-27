import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import {
  AsyncPipe,
  DatePipe,
  NgFor,
  NgIf,
  isPlatformBrowser,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { initDatepickers } from 'flowbite';
import { Observable } from 'rxjs';
import { fromCalendarSelector } from './data/calendar.selector';
import { Store } from '@ngrx/store';
import { AppState } from '@clutterfreefinds-v2/globals';

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
  private store: Store<AppState> = inject(Store);
  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _serviceSelectedDateTime$!: Observable<string>;

  public selectedDate!: Date;
  public selectedTime: any;
  public timePicker: Array<ITime>;
  public minDate!: string;

  private formatter = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this._serviceSelectedDateTime$ = this.store.select(
      fromCalendarSelector.selectedServiceDate
    );
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
    this._serviceSelectedDateTime$.pipe().subscribe((d) => {
      console.log('date', d);
      if (d) {
        this.selectedDate = new Date(d);
        this._setTimeSelected(new Date(d));
      }
    });
    console.log('selected date', this.selectedDate);
    this.minDate = this.formatter.format(new Date());
    if (isPlatformBrowser(this.platformId)) {
      initDatepickers();
    }
  }

  public _commonChangeDetector(): void {
    this._changeDetectorRef.detectChanges();
  }

  onDatePicked(e: any) {
    this.selectedDate = new Date(e.detail.date);
    console.log('selected', this.selectedDate);
    this._commonChangeDetector();
  }
  onTimePicked($event: string) {
    const time = $event;
    this.selectedTime = time;
    this._formatDate(time);
  }

  private _setTimeSelected(date: Date) {
    this.selectedTime = new Date(date).toTimeString().slice(0, 5);
  }

  private _formatDate(time: string) {
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
