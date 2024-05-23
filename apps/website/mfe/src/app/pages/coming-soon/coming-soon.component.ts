import { Component } from '@angular/core';
import { CFF_SOCIAL_ACCOUNTS } from '@clutterfreefinds-v2/globals';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cs-coming-soon',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './coming-soon.component.html',
})
export class ComingSoonComponent {
  CFF_SOCIAL_ACCOUNTS = CFF_SOCIAL_ACCOUNTS;
}
