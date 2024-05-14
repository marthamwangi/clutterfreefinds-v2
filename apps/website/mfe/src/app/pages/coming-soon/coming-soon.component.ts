import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CFF_SOCIAL_ACCOUNTS } from '@clutterfreefinds-v2/globals';

@Component({
  selector: 'cs-coming-soon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
})
export class ComingSoonComponent {
  CFF_SOCIAL_ACCOUNTS = CFF_SOCIAL_ACCOUNTS;
}
