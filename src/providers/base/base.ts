import { CouchDBProvider } from '../couch-db/couch-db';
import { CouchDBFactory } from '../couch-db/couch-db-factory';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseProvider {
  protected dom: CouchDBProvider;

  constructor(protected couchDB: CouchDBFactory) {
    this.dom = this.couchDB.getCouchDB();
  }

  public create(input: any): Promise<any> {
    return this.dom.postDoc(input)
      .then(response => Promise.resolve(response))
      .catch(err => Promise.reject(err));
  }

  public update(input: any): Promise<any> {
    return this.dom.putDoc(input)
      .then(response => Promise.resolve(response))
      .catch(err => Promise.reject(err));
  }

  public getOneById(id: string): Promise<any> {
    return this.dom.getDoc(id)
      .then(doc => Promise.resolve(doc))
      .catch(err => Promise.reject(err));
  }

  protected getAllByType(type: string): Promise<any> {
    const query = {
      selector: {
        type: { $eq: type }
      }
    };
    return this.dom.findDocs(query)
      .then(docs => Promise.resolve(docs))
      .catch(err => Promise.reject(err));
  }

  protected getAllBy(viewName: string, params: object = null): Promise<any> {
    return this.dom.queryViews(viewName, params)
      .then(response => Promise.resolve(response.rows))
      .catch(err => Promise.reject(err));
  }

  public static getDateTimeNow(): string {
    const now = new Date();
    return now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
  }

}
