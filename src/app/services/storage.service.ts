import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor() {}

  public storeItem(key: string, id: string) {
    localStorage.setItem(key, id);
  }

  public getItem(key: string): any  {
    return localStorage.getItem(key);
  }

  public removeItem(name:string){
    localStorage.removeItem(name)
  }
}
