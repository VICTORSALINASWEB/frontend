import { Component, OnInit } from '@angular/core';
import { alerts } from 'src/app/helpers/alerts';
import { iCampana } from 'src/app/interfaces/iCampana.interface';
import { CampanaService } from 'src/app/services/campana.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrearCampanasComponent } from './crear-campanas/crear-campanas.component';
import { MatDialog } from '@angular/material/dialog';
import { iFiltroCampana } from 'src/app/interfaces/iResponse.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { EditarCampanasComponent } from './editar-campanas/editar-campanas.component';
import { iMensaje } from 'src/app/interfaces/iMensaje.interface';
import { MensajeService } from '../../../services/mensaje.service';
import { MensajesCampanasComponent } from './mensajes-campanas/mensajes-campanas.component';

@Component({
  selector: 'app-campanas',
  templateUrl: './campanas.component.html',
  styleUrls: ['./campanas.component.css']
})
export class CampanasComponent implements OnInit{
  
  formularioFiltro: FormGroup = this.from.group({
    fechaInicio: [''],
    fechaFin: [''],
  })
  dataSource: iCampana[] =[];
  displayedColumns: string[] = ['index','name', 'process_date','process_hour','process_status','accion'];
  constructor(
    private campanaService: CampanaService,
    private from: FormBuilder,
    public dialog: MatDialog,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    private mensajeService: MensajeService

  ){

  }

  ngOnInit() {
    this.rellenarFormulario(); 
    this.cargarUsuarios();
  }
  rellenarFormulario(){
    this.formularioFiltro.patchValue({
      fechaInicio: [this.formatDate(new Date())],
      fechaFin: [this.formatDate(new Date())]
    });    
  }

  private formatDate(date: Date): string {
    date.setHours(date.getHours() - 5); // Resta 5 horas
    return date.toISOString().split('T')[0];
  }
  async filtrarCampana(){
    const {fechaInicio,fechaFin} = this.formularioFiltro.value

    const startDate = new Date(fechaInicio);
    const endDate = new Date(fechaFin);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      await alerts.basicAlert('Ok', 'Las fechas proporcionadas no son válidas.', 'error');
      return;
    }

    if (startDate > endDate) {
      await alerts.basicAlert('Ok', 'La fecha de inicio no puede ser mayor que la fecha de fin.', 'error');
      return
    } 

    const iFiltroCampana: iFiltroCampana= {
      fechaFin,
      fechaInicio
    };
    
    await alerts.showLoader();
      const exec = this.campanaService.getDataFilter(iFiltroCampana);
      exec.subscribe(
        async resp=>{
          if(resp.statusCode === 200) {
              this.dataSource = resp.campaigns??[]; 
              this.localStorageService.agregar('campaigns',JSON.parse(JSON.stringify(resp.campaigns??[])));
              await alerts.closeLoader();  
          }else{
            await alerts.closeLoader();
            await alerts.basicAlert('Ok', 'Error al cargar la información', 'error');

          }
        },
        async err=>{
          this.dataSource = [];
          await alerts.closeLoader();
          await alerts.basicAlert('Ok', 'Error al cargar la información', 'error');
        }
        
      );  
    
  }

  clickCrearCampana() {
    const dialogRef = this.dialog.open(CrearCampanasComponent,{width: '100%'});
    //actualizar el listado de la tabla
    dialogRef.afterClosed().subscribe(
      result =>{
        if(result){
        }
      }
    )
  }

  cargarUsuarios(){
    const exec = this.usuarioService.getData();
    exec.subscribe(
      async resp=>{
        if(resp.statusCode === 200) {
           await this.localStorageService.agregar('users',(resp.users??[]));
        }else{
          await  this.localStorageService.agregar('users',[]);
        }
      },
      async err=>{
        await this.localStorageService.agregar('users',[]);
        
      }
      
    );
  }

  clickEditar(id: number){
    const dialogRef = this.dialog.open(EditarCampanasComponent,{
      width: '100%',
      data:{
        id:id
      }
    });
    dialogRef.afterClosed().subscribe(
      result =>{
        if(result){
          this.filtrarCampana();         
        }
      }
    );    

  }
  async clickEnviar(id: number){
    const lista = this.dataSource.find(x=> x.id === id)??{id: 0};
    if(lista.id === 0){
      return
    }
    const resp = await alerts.confirmarAlert('Seguro que quiere enviar las capañas a estos numeros?',JSON.parse(lista?.phone_list??'').join(', '))
    if(resp){
      await alerts.showLoader();

      const listaCelular: string[] = JSON.parse(lista?.phone_list??'');
      let listaError: string[] = [];
      let listaRegistrados: string[] = [];
      listaCelular.filter(
        async cel=>{
          const paramMensage: iMensaje ={
            campaign_id: id,
            phone: cel,
            id: 0,
            process_date: lista?.process_date,
            process_hour: lista?.process_hour,
            shipping_status: 1,
            text: lista?.message_text
          }
          const exec = await this.mensajeService.create(paramMensage);
          exec.subscribe(
            resp=> {
              if(resp.statusCode===200){
                listaRegistrados.push(cel);
              }else{
                listaError.push(cel);
              }
            },
            err=>{
              listaError.push(cel);
            }
          );
        }
      );
      
      lista.process_status = 2;      
      this.campanaService.updateCampana(lista).subscribe(
        async resp=>{
          if(resp.statusCode===200){
            await this.filtrarCampana();
            await alerts.closeLoader();
            setTimeout(async () => {
              await alerts.basicAlert('Ok', 'Se envio correctamente los mensajes ', 'success');
              
            }, 100);
          }else{
            await alerts.closeLoader();
          }
        },
        async err=>{
          await alerts.closeLoader();
          await alerts.basicAlert('Ok', 'Error al cargar la información', 'error');

        }
      )


    }
    
  }

  clickVerMensaje(id: number){
 
    const dialogRef = this.dialog.open(MensajesCampanasComponent,{
      width: '100%',
      data:{
        id:id
      }
    });
    dialogRef.afterClosed().subscribe(
      result =>{
        if(result){
          this.filtrarCampana();         
        }
      }
    );    
  }
}