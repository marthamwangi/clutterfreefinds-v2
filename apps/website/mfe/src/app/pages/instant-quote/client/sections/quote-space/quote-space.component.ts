import { NgFor, AsyncPipe } from '@angular/common';
import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'iq-quote-space',
  standalone: true,
  imports: [NgFor, AsyncPipe, FormsModule],
  templateUrl: './quote-space.component.html',
  styleUrls: ['./quote-space.component.scss'],
})
export class QuoteSpaceComponent {
  // @Output() selectedService$ = new EventEmitter<>();
}
