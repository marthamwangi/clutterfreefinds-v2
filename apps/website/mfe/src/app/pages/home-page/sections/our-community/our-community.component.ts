import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'cff-v2-our-community',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './our-community.component.html',
  styleUrls: ['./our-community.component.scss'],
})
export class OurCommunityComponent {
  bookACall() {
    window.open('https://koalendar.com/e/have-us-call-you', '_blank');
  }
}
