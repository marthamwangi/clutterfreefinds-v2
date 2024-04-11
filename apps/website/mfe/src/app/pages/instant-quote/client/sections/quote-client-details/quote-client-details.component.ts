import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountyService } from '../../services/county.service';
import { BASE_API, KENYA_COUNTIES } from '@clutterfreefinds-v2/globals';

@Component({
  selector: 'iq-quote-client-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-client-details.component.html',
  styleUrls: ['./quote-client-details.component.scss'],
})
export class QuoteClientDetailsComponent {
  constructor(private _countyService: CountyService) {}

  ngOnInit() {
    this._getCounties();
  }
  private _getCounties() {
    console.log('here');
    this._countyService.getAllCountys(`${BASE_API}/${KENYA_COUNTIES}`);
  }
}
