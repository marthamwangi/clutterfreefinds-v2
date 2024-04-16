import { Injectable, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DeserializeCounty } from '../../mappers/county.mapper';
import { CountyResponse, ICountyModel } from '../../models/county.model';

@Injectable({
  providedIn: 'root',
})
export class CountyService {
  private _deserializeCounty: DeserializeCounty;

  constructor(private _http: HttpClient) {
    this._deserializeCounty = new DeserializeCounty();
  }

  fetchCountiesData(url: string) {
    return this._http.get<CountyResponse>(url).pipe(
      map((response) => ({
        counties: this._deserializeCounty.deserialize(response.data),
        ...response,
      }))
    );
  }
}
