import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'cff-v2-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'website';
  constructor(private _translateService: TranslateService) {
    _translateService.addLangs(['en', 'sw']);
    _translateService.setDefaultLang('en');
    _translateService.use('en');
  }
}
