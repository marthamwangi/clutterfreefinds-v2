import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  constructor(private _httpClient: HttpClient) {}

  newsLetterService(url: string, body: any, params: object) {
    return this._httpClient.post(url, body);
  }
}
