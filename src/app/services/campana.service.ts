import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { iFiltroCampana, iResponse } from '../interfaces/iResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CampanaService {

  private url:string = environment.urlApi;

  constructor(
    private http: HttpClient
  ) { }

  getDataFilter(filtro: iFiltroCampana){
    return this.http.get<iResponse>( `${this.url}campaign?fechaInicio=${filtro.fechaInicio}&fechaFin=${filtro.fechaFin}`);
  }
}
