import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { iResponse } from '../interfaces/iResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  private url:string = environment.urlApi;

  constructor(
    private http: HttpClient
  ) { }
  getData(){
    return this.http.get<iResponse>(this.url+'message');
  }
}
