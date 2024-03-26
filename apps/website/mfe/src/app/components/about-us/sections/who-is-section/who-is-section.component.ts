import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'about-who-is-section',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './who-is-section.component.html',
  styleUrls: ['./who-is-section.component.scss'],
})
export class WhoIsSectionComponent {}
