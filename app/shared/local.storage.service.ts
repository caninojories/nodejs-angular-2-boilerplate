import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorage {
  constructor() {
  }

  private storage = window.localStorage;

  setToken(tokenName, tokenData) {
    this.storage.setItem(tokenName, tokenData);
  }

  getToken(tokenName) {
    return this.storage.getItem(tokenName);
  }

  removeToken(tokenName) {
    this.storage.removeItem(tokenName);
  }
}
