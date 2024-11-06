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

    // Store example users in local storage
    const exampleUsers = [
      {
        email: 'prueba@duocuc.cl',
        password: 'hola123',
        isStudent: true,
        isTeacher: false,
      },
      {
        email: 'prueba@profesor.duocuc.cl',
        password: 'hola123',
        isStudent: false,
        isTeacher: true,
      },
    ];

    localStorage.setItem('users', JSON.stringify(exampleUsers));
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public async get(key: string) {
    return await this._storage?.get(key);
  }
}
