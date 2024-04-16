import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DeserializeMaterial } from '../../mappers/material.mapper';
import { MaterialResponse } from '../../models/material.model';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private _deserializeMaterial: DeserializeMaterial;
  constructor(private _http: HttpClient) {
    this._deserializeMaterial = new DeserializeMaterial();
  }

  getAllMaterials(url: string): Observable<MaterialResponse> {
    return this._http.get<any>(url).pipe(
      map((response) => ({
        materials: this._deserializeMaterial.deserialize(response.data),
        ...response,
      }))
    );
  }
}
