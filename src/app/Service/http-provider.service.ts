import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = 'http://localhost:3000/';

var httpLink = {
  getAllCliente: apiUrl + '/api/Cliente/getAllCliente',
  deleteClienteById: apiUrl + '/api/Cliente/deleteClienteById/',
  getClienteDetailById: apiUrl + '/api/Cliente/getClienteDetailById/',
  saveCliente: apiUrl + '/api/Cliente/saveCliente',
};

@Injectable({
  providedIn: 'root',
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) {}

  public getAllCliente(): Observable<any> {
    return this.webApiService.get(httpLink.getAllCliente);
  }
  public deleteClienteById(id: any) {
    return this.webApiService.delete(httpLink.deleteClienteById + id);
  }
  public getClienteDetailById(id: any): Observable<any> {
    return this.webApiService.get(httpLink.getClienteDetailById + id);
  }
  public saveCliente(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveCliente, model);
  }
}
