import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cff-v2-why-cff',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './why-cff.component.html',
  styleUrls: ['./why-cff.component.scss'],
})
export class WhyCffComponent {
  bookACall() {
    window.open('https://koalendar.com/e/have-us-call-you', '_blank');
  }
}
