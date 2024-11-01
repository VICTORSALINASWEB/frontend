import { Component, Inject, OnInit } from '@angular/core';
import { iMensaje } from 'src/app/interfaces/iMensaje.interface';
import { MensajeService } from '../../../../services/mensaje.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { iCampana } from 'src/app/interfaces/iCampana.interface';

export interface IDialogData {
  id: number
}
@Component({
  selector: 'app-mensajes-campanas',
  templateUrl: './mensajes-campanas.component.html',
  styleUrls: ['./mensajes-campanas.component.css']
})
export class MensajesCampanasComponent implements OnInit{

  dataSource: iMensaje[] =[];
  displayedColumns: string[] = ['index','phone', 'text','shipping_status'];
  tituloCampana = '';
  constructor(
    private mensajeService: MensajeService,
    private localStorageService: LocalStorageService,
    public dialoRef: MatDialogRef<MensajesCampanasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ){

  }

  ngOnInit(){
    this.cargarMensajes();
  }

  async cargarMensajes(){
    const campaigns: iCampana[] = await this.localStorageService.obtener('campaigns')??[];
    this.tituloCampana = campaigns.find(x=> x.id === this.data.id)?.name??'';
    const exec = this.mensajeService.getAllMensaje(this.data.id);
    exec.subscribe(
      resp=>{
        if(resp.statusCode===200){
          this.dataSource = resp.aMessages??[];
        }else{
          this.dataSource = [];
        }
      },
      err=>{
        this.dataSource = [];
      }
    )
  }
}
