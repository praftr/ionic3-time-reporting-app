import { CouchDBProvider } from './couch-db';
import { Injectable } from '@angular/core';

@Injectable()
export class CouchDBFactory {
  private db: CouchDBProvider;

  public async createCouchDB(): Promise<CouchDBProvider> {
    this.db = new CouchDBProvider();
    return await this.db.initialize();
  }

  public getCouchDB(): CouchDBProvider {
    if (this.db) {
      return this.db;
    }
  }
}
