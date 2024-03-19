import { Component } from '@angular/core';
import { DEFAULT_APP_LANGUAGE } from '@clutterfreefinds-v2/globals';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cff-v2',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'website';
  constructor(private _translateService: TranslateService) {
    _translateService.addLangs(['en', 'sw']);
    _translateService.setDefaultLang(DEFAULT_APP_LANGUAGE);
    _translateService.use('en');
  }
}
