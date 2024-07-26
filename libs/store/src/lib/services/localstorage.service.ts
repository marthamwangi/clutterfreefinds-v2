import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { StorageAction } from '../types.interface';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ClientStorageService {
  #items$: BehaviorSubject<any>;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.#items$ = new BehaviorSubject<any>('');
  }

  private _setContent(key: string) {
    this.#items$.next(this._getAllFromStorage(key));
  }

  public StorageAPI(action: StorageAction, key: string, payload?: any): any {
    switch (action) {
      case 'create':
        return this._create(key, payload);
      case 'read':
        switch (payload.read) {
          case 'one':
            return this._read(key, payload);
          case 'many':
            return this._getAllFromStorage(key);
          default:
            return this._fetchAll();
        }
      case 'update':
        return this._updateStorage(key, payload);
      case 'delete':
    }
  }
  private _fetchAll(): any {
    return this.#items$;
  }
  private _read(key: string, payload: any): any {
    return this._getItemByParam(key, payload);
  }
  private _getItemByParam(key: string, payload: any): any {
    const item = this._getAllFromStorage(key).find(
      (item) => item[payload.property] === payload.param
    );
    return item;
  }
  private _create(key: string, payload: any): any {
    this._updateStorage(key, [...this._getAllFromStorage(key), payload]);
    this._setContent(key);
  }

  private _updateStorage(key: string, arg1: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(arg1));
    }
  }
  private _getAllFromStorage(key: string): Array<any> {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return [];
  }
}
