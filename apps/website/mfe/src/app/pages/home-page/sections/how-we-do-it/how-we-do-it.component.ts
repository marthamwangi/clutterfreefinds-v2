import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IframeUrlPipe } from '@clutterfreefinds-v2/shared/pipes';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cff-v2-how-we-do-it',
  standalone: true,
  imports: [TranslateModule, NgFor, NgIf, RouterLink, IframeUrlPipe],
  templateUrl: './how-we-do-it.component.html',
  styleUrls: ['./how-we-do-it.component.scss'],
})
export class HowWeDoItComponent implements OnInit, OnDestroy {
  @ViewChild('youtubeVideoRef', { static: true })
  private _youtubeIframe!: ElementRef<HTMLDivElement>;

  public isVideoVisible: boolean = false;
  #videoObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px',
  };
  #ytIntersectionObserver!: IntersectionObserver;
  ytIframe: string =
    'https://www.youtube.com/embed/eZClhYwU7Qc?start=210;controls=0&mute=1&showinfo=0&rel=0&autoplay=1&loop=1';
  public description: Array<{ title: string; bold: boolean }> = [
    {
      title: 'HOME_PAGE.HOW_WE_DO_IT.DESCRIPTION.TEXT_1',
      bold: false,
    },
    {
      title: 'HOME_PAGE.HOW_WE_DO_IT.DESCRIPTION.TEXT_2',
      bold: true,
    },
    {
      title: 'HOME_PAGE.HOW_WE_DO_IT.DESCRIPTION.TEXT_3',
      bold: true,
    },
    {
      title: 'HOME_PAGE.HOW_WE_DO_IT.DESCRIPTION.TEXT_4',
      bold: false,
    },
    {
      title: 'HOME_PAGE.HOW_WE_DO_IT.DESCRIPTION.TEXT_5',
      bold: true,
    },
    {
      title: 'HOME_PAGE.HOW_WE_DO_IT.DESCRIPTION.TEXT_6',
      bold: false,
    },
  ];

  ngOnInit(): void {
    this.#triggerYTVideo();
  }
  ngOnDestroy(): void {
    this.#ytIntersectionObserver.disconnect();
  }

  #triggerYTVideo() {
    this.#ytIntersectionObserver = new IntersectionObserver((event) => {
      this.isVideoVisible = event[0].isIntersecting;
    }, this.#videoObserverOptions);
    this.#ytIntersectionObserver.observe(this._youtubeIframe.nativeElement);
  }
}
