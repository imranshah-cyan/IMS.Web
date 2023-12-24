import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class SetService {

  constructor(private _httpClient: HttpClient) { }

  api: string = '';

  postRequest(body: any, apiEndPoint: string): Observable<any> {
    this.api = environment.baseURL + apiEndPoint
    return this._httpClient.post<any>(this.api, body);
  }

  deleteRequest(apiEndPoint: string): Observable<any> {
    this.api = environment.baseURL + apiEndPoint
    return this._httpClient.delete<any>(this.api);
  }

  putRequest(body: any, apiEndPoint: string): Observable<any> {
    this.api = environment.baseURL + apiEndPoint
    return this._httpClient.put<any>(this.api, body);
  }
  // //RegisterCustomer
  // RegisterCutomer(customer: Customer, apiEndPoint: string): Observable<RegisterCustomerResponse> {
  //   this.api = environment.baseURL + apiEndPoint
  //   return this.http.post<RegisterCustomerResponse>(this.api, customer);
  // }

  // //GetAllCustomerTypes
  // GetAllCustomerTypes(apiEndPoint: string): Observable<CustomerType[]> {
  //   this.api = environment.baseURL + apiEndPoint
  //   return this.http.post<CustomerType[]>(this.api, 0);
  // }

  // //GetFreeAppointmentSlots
  // GetFreeAppointmentSlots(request: availableSlots, apiEndPoint: string):
  //   Observable<GetFreeAppointmentSlotsResponse> {
  //   this.api = environment.baseURL + apiEndPoint
  //   return this.http.post<GetFreeAppointmentSlotsResponse>(this.api, request);
  // }

  // //GetOrganizationConfiguration
  // GetOrganizationConfiuration(apiEndPoint: string): Observable<OrganizationConfiguration> {
  //   this.api = environment.baseURL + apiEndPoint
  //   return this.http.post<OrganizationConfiguration>(this.api, {});
  // }

  // //GetServices
  // GetServices(apiEndPoint: string): Observable<AllServices[]> {
  //   this.api = environment.baseURL + apiEndPoint
  //   return this.http.post<AllServices[]>(this.api, 0);
  // }
}
