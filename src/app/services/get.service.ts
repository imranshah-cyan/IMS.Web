import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  api:string = ''

  constructor(private _httpClient: HttpClient) { }

  getRequest(apiEndPoint: string) {
    this.api = environment.baseURL + apiEndPoint
    return this._httpClient.get<any>(this.api);
  }

}
