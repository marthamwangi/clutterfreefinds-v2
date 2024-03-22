import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from '@clutterfreefinds-v2/language';
@Component({
  selector: 'cff-header',
  standalone: true,
  imports: [TranslateModule, LanguageComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}
