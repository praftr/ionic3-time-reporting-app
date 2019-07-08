import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';

@Injectable()
export class UserProvider extends BaseProvider {
  static readonly TYPE = 'user';
}
