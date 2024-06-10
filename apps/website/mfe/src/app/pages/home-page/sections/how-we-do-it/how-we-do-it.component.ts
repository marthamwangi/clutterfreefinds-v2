import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
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
})
export class HowWeDoItComponent implements AfterViewInit, OnDestroy {
  @ViewChild('youtubeVideoRef', { static: true })
  private _youtubeIframe!: ElementRef<HTMLDivElement>;

  public isVideoVisible: boolean = false;
  #videoObserverOptions = {
    threshold: 0,
    rootMargin: '30%',
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

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.#ytIntersectionObserver = new IntersectionObserver((event) => {
        this.isVideoVisible = event[0].isIntersecting;
      }, this.#videoObserverOptions);
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.#ytIntersectionObserver.observe(this._youtubeIframe.nativeElement);
    }
  }
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.#ytIntersectionObserver.disconnect();
    }
  }
}
