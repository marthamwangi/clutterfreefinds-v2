import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DeserializeCounty } from '../../mappers/county.mapper';
import { CountyResponse } from '../../models/county.model';

@Injectable({
  providedIn: 'root',
})
export class CountyService {
  private _deserializeCounty: DeserializeCounty;
  constructor(private _http: HttpClient) {
    this._deserializeCounty = new DeserializeCounty();
  }

  getAllCountys(url: string): Observable<CountyResponse> {
    console.log('service');
    return this._http.get<any>(url).pipe(
      map((response) => ({
        counties: this._deserializeCounty.deserialize(response.data),
        ...response,
      }))
    );
  }
}
