import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Guardar un valor en el LocalStorage de forma asincrónica
  async setItem(key: string, value: any){
    await localStorage.setItem(key, JSON.stringify(value));
  }

  // Obtener un valor del LocalStorage de forma asincrónica
  async getItem(key: string){
    await localStorage.getItem(key);
  }

  // Eliminar un valor del LocalStorage de forma asincrónica
  async removeItem(key: string){
    await localStorage.removeItem(key);
  }

  // Borrar todo el contenido del LocalStorage de forma asincrónica
  async clear(){
    await localStorage.clear();
  }

  // Obtener un valor del LocalStorage de forma asincrónica
  async obtenerItem(key: string): Promise<any> {
    try {
      return await new Promise<any>((resolve, reject) => {
        const item = localStorage.getItem(key);
        resolve(item ? JSON.parse(item) : null);
      });
    } catch (error) {
      throw error;
    }
  }


}
