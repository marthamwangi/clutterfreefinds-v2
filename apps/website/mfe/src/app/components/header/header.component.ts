import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from './section/language/language.component';

@Component({
  selector: 'cff-v2-header',
  standalone: true,
  imports: [TranslateModule, LanguageComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}
