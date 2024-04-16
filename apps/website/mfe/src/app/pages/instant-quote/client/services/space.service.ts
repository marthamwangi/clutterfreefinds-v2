import { Injectable } from '@angular/core';
import { DeserializeSpace } from '../../mappers/space.mapper';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SpaceResponse } from '../../models/space.model';

@Injectable({
  providedIn: 'root',
})
export class SpaceService {
  private deserializeSpace: DeserializeSpace;
  constructor(private _http: HttpClient) {
    this.deserializeSpace = new DeserializeSpace();
  }

  getAllSpaces(url: string): Observable<SpaceResponse> {
    return this._http.get<any>(url).pipe(
      map((response) => ({
        spaces: this.deserializeSpace.deserialize(response.data),
        ...response,
      }))
    );
  }
}
