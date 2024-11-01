import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { iResponse } from '../interfaces/iResponse.interface';
import { iMensaje } from '../interfaces/iMensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  private url:string = environment.urlApi;

  constructor(
    private http: HttpClient
  ) { }
  getAllMensaje(id: number){
    return this.http.get<iResponse>(this.url+'message/'+id);
  }

  getData(){
    return this.http.get<iResponse>(this.url+'message');
  }

  create(data: iMensaje){
    return this.http.post<iResponse>(this.url+'message',data);
  }
}
