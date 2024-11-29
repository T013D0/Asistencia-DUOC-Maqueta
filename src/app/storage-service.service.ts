import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

import { type User } from 'src/const/types';

@Injectable({
  providedIn: 'root',
})
export class StorageServiceService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  async get(key: string) {
    if (!this._storage) await this.init();
    return await this._storage?.get(key);
  }
  async set(key: string, data: any) {
    if (!this._storage) await this.init();
    return await this._storage?.set(key, data);
  }

  async clearUserStatus() {
    if (!this._storage) await this.init();
    await this._storage?.remove('user');
    await this._storage?.remove('asignatures');
    return await this._storage?.remove('profile');
  }

  async remove(key: string) {
    if (!this._storage) await this.init();
    return await this._storage?.remove(key);
  }
}
