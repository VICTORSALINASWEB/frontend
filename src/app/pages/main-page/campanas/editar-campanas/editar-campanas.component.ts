import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { iUsuario } from 'src/app/interfaces/iUsuario.interface';
//para usar ek chips
import {MatChipInputEvent} from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { iCampana } from 'src/app/interfaces/iCampana.interface';
import { CampanaService } from '../../../../services/campana.service';
import { alerts } from 'src/app/helpers/alerts';

export interface IDialogData {
  id: number
}
@Component({
  selector: 'app-editar-campanas',
  templateUrl: './editar-campanas.component.html',
  styleUrls: ['./editar-campanas.component.css']
})
export class EditarCampanasComponent {
  campaignsParam: iCampana = {id: 0};
  phone_list: string[] = [];
  dataUsuarios: iUsuario[] =[];
  formulario: FormGroup = this.from.group({
    name: [''],
    process_date: [''],
    process_hour: [''],
    phone_list: [],
    message_text: [''],
    user_id: [0],
  })
  loadData = false;

  announcer = inject(LiveAnnouncer);

  error = {
    name: '',
    process_date: '',
    process_hour: '',
    phone_list: '',
    message_text: '',
    user_id: '',
  }

  removeKeyword(keyword: string) {
    const index = this.phone_list.indexOf(keyword);
    if (index >= 0) {
      this.phone_list.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.phone_list.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
 

  constructor(
    private from: FormBuilder,
    public dialoRef: MatDialogRef<EditarCampanasComponent>,
    private localStorageService: LocalStorageService,
    private campanaService: CampanaService,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ){
  }

  async ngOnInit() {
    this.rellenarFormulario();  
  }

  async rellenarFormulario(){
    this.dataUsuarios = (await this.localStorageService.obtener('users')??[]);
    await alerts.showLoader();
    const dataCampaigns: iCampana[] = (await this.localStorageService.obtener('campaigns')??[]);
     this.campaignsParam = dataCampaigns.find(x=> x.id === this.data.id)??{id: 0};
    if(this.campaignsParam.id === 0){
      await alerts.closeLoader();  
      this.dialoRef.close('error');
      await alerts.basicAlert('Ok', 'Error registrar la información', 'error');
    }else{
      await alerts.closeLoader();  
      this.phone_list = JSON.parse((this.campaignsParam.phone_list??''));
      
      this.formulario.patchValue({
        name: this.campaignsParam.name,
        process_date: this.campaignsParam.process_date,
        process_hour: this.campaignsParam.process_hour,
        phone_list: JSON.parse((this.campaignsParam.phone_list??'')),
        message_text: this.campaignsParam.message_text,
        user_id: this.campaignsParam.user_id,
      });
    }
  }
  async guardar(){

    const { name,process_date,process_hour,phone_list,message_text,user_id} = this.formulario.value

    let iError = 0;
    if(!name){
      this.error.name  = 'Falta completar';
      iError++;
    }else{
      this.error.name = '';
    }
    
    const fecha = new Date(process_date);
    
    if (isNaN(fecha.getTime()) ) {
      this.error.process_date  = 'Fecha no valida';
      iError++;

    }else{
      this.error.process_date  = '';
    }

    if(!process_hour){
      this.error.process_hour  = 'Hora no valida';
      iError++;

    }else{
      this.error.process_hour  = '';
    }
    
    if(!phone_list){
      this.error.phone_list  = 'Ingrese un n° de celular';
      iError++;

    }else{
      this.error.phone_list  = '';
    }    
    if(!message_text){
      this.error.message_text  = 'Ingrese un mensaje de texto';
      iError++;

    }else{
      this.error.message_text  = '';
    }
    if(+user_id === 0){
      this.error.user_id  = 'Seleccione un usuario';
      iError++;

    }else{
      this.error.user_id  = '';
    }

    if(iError > 0){
      return;
    }

    const paramData: iCampana = {
      id: this.campaignsParam.id,
      name,
      message_text,
      phone_list: JSON.stringify(phone_list),
      process_date,
      process_hour,
      process_status: 1,
      user_id: user_id

    
    }
    await alerts.showLoader();
    const exec = await this.campanaService.updateCampana(paramData);
    exec.subscribe(
      async resp=> {

        if(resp.statusCode === 200){          
          await alerts.closeLoader();  
          this.dialoRef.close('guardado');
          await alerts.basicAlert('Ok', 'Se edito correctamente la campaña', 'success');


        }else{
          await alerts.closeLoader();  
          this.dialoRef.close('error');
          await alerts.basicAlert('Ok', 'Error al editar la información', 'error');

        }
      },
      async err=>{
        await alerts.closeLoader();  
        this.dialoRef.close('error');
        await alerts.basicAlert('Ok', 'Error al editar la información', 'error');
      }
    );

  }
}
