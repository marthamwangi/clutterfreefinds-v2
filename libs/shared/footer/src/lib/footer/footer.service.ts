import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  constructor(private _httpClient: HttpClient) {}
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  private options = { headers: this.headers };

  newsLetterService(url: string, body: any, params: object = this.options) {
    return this._httpClient.post(url, body, {
      params: {
        ...params,
      },
    });
  }
}
