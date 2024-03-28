import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'about-hero-section',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent {
  bookACall() {
    window.open('https://koalendar.com/e/have-us-call-you', '_blank');
  }
}
