import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import { Views } from '../../models/model.module';

PouchDB.plugin(PouchDBFind);

@Injectable()
export class CouchDBProvider {
  private static readonly SYNC_OPTIONS = {
    live: true, // changes are propagated between the two databases as the changes occur (real-time replication)
    retry: true // if user goes offline, retry until connection is re-established
  };
  private localDB: any;
  private remoteDB: any;

  constructor() {
    this.localDB = new PouchDB('edycem');
    this.remoteDB = new PouchDB(`https://daefdabf-f8f9-49cb-8872-8fa46824191b-bluemix.cloudant.com/edycem`);
  }

  public async initialize(): Promise<any> {
    await this.synchronize();
    await this.pushViews();
  }

  public synchronize(): Promise<any> {
    return this.handleReplication()
      .then(() => {
        this.handleSynchronisation()
          .catch(err => this.onSyncError(err))
      })
      .catch(err => this.onSyncError(err))
  }

  private async handleReplication(): Promise<any> {
    return await this.localDB.replicate.from(this.remoteDB)
      .on('complete', () => Promise.resolve())
      .on('error', err => Promise.reject(err))
  }

  private async handleSynchronisation(): Promise<any> {
    return await this.localDB.sync(this.remoteDB, CouchDBProvider.SYNC_OPTIONS)
      .on('change', info => this.onSyncChange(info))
      .on('paused', () => this.onSyncPaused())
      .on('error', err => this.onSyncError(err));
  }

  private onSyncChange(info) {
    console.log('syncing changes', info);
  }

  private onSyncPaused() {
    console.log('syncing paused');
  }

  private onSyncError(err) {
    console.error('syncing error', err.result);
  }

  public getDoc(id: string): Promise<any> {
    return this.localDB.get(id)
      .then(doc => Promise.resolve(doc))
      .catch(err => Promise.reject(err));
  }

  public postDoc(input: any): Promise<any> {
    return this.localDB.post(input)
      .then(result => this.localDB.get(result.id))
      .then(doc => Promise.resolve(doc))
      .catch(err => Promise.reject(err));
  }

  public putDoc(input: any): Promise<any> {
    return this.localDB.get(input._id)
      .then(doc => this.localDB.put(Object.assign(doc, input)))
      .then(() => this.localDB.get(input._id))
      .then(doc => Promise.resolve(doc))
      .catch(err => Promise.reject(err));
  }

  public findDocs(query: any): Promise<any[]> {
    return this.localDB.find(query)
      .then(response => Promise.resolve(response.docs))
      .catch(err => Promise.reject(err));
  }

  public findDoc(query: any): Promise<any> {
    query.limit = 1;
    return this.localDB.find(query)
      .then(response => Promise.resolve(response.docs))
      .catch(err => Promise.reject(err));
  }

  public createIndex(index: any): Promise<any> {
    return this.localDB.createIndex(index)
      .then(response => Promise.resolve(response.result))
      .catch(err => Promise.reject(err));
  }

  public queryDocs(index, params): Promise<any[]> {
    return this.localDB.createIndex(index)
      .then(() => this.localDB.findDocs(params))
      .catch(err => Promise.reject(err));
  }

  public queryViews(viewName: string, params: object): Promise<any> {
    return this.localDB.query(viewName, params)
      .then(docs => Promise.resolve(docs))
      .catch(err => Promise.reject(err));
  }

  private putView(view: object): Promise<any> {
    return this.localDB.put(view)
      .then(response => Promise.resolve(response))
      .catch(err => {
        if (err.name !== 'conflict') {
          Promise.reject(err);
        }
      });
  }

  public async pushViews(): Promise<any> {
    return Views.forEach(async view => {
      await this.putView(view)
    });
  }
}
