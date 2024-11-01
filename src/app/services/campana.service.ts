import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { iFiltroCampana, iResponse } from '../interfaces/iResponse.interface';
import { iCampana } from '../interfaces/iCampana.interface';

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
  
  createCampana(data: iCampana){
    return this.http.post<iResponse>( `${this.url}campaign`,data);
  }
  updateCampana(data: iCampana){
    return this.http.patch<iResponse>(`${this.url}campaign/${data.id}`,data);
  }
}
