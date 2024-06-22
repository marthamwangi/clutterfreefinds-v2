import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'cs-coming-soon',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './coming-soon.component.html',
})
export class ComingSoonComponent {
  #location: Location = inject(Location);
  goBack() {
    this.#location.back();
  }
}
