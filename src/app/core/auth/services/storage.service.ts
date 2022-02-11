import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  get(propertyName: string): any | null {
    try {
      return JSON.parse(localStorage.getItem(propertyName));
    } catch (e) {
      return null;
    }
  }

  set(propertyName: string, value: any) {
    localStorage.setItem(propertyName, JSON.stringify(value));
  }

  remove(propertyName: string) {
    localStorage.removeItem(propertyName);
  }

}
