import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'cff-v2',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'website';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }
}
