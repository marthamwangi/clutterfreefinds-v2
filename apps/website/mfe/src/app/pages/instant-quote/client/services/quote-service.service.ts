import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeserializeCffService } from '../../mappers/cffService.mapper';
import { Observable, map } from 'rxjs';
import { ICffServiceResponse } from '../../models/cffSservice.model';

@Injectable({
  providedIn: 'root',
})
export class CFFServices {
  private deserializeCffServices: DeserializeCffService;
  constructor(private _httpClient: HttpClient) {
    this.deserializeCffServices = new DeserializeCffService();
  }

  getCffServices(url: string): Observable<ICffServiceResponse> {
    return this._httpClient.get<any>(url).pipe(
      map((response) => ({
        services: this.deserializeCffServices.deserialize(response.data),
        ...response,
      }))
    );
  }
}
