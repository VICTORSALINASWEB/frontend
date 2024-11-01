import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Guardar un valor en el LocalStorage de forma asincrónica
  async agregar(key: string, value: any){
    await localStorage.setItem(key, JSON.stringify(value));
  }

  // Eliminar un valor del LocalStorage de forma asincrónica
  async eliminar(key: string){
    await localStorage.removeItem(key);
  }

  // Borrar todo el contenido del LocalStorage de forma asincrónica
  async eliminarTodo(){
    await localStorage.clear();
  }

  // Obtener un valor del LocalStorage de forma asincrónica
  async obtener(key: string): Promise<any> {
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
