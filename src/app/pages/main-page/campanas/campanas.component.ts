import { Component, OnInit } from '@angular/core';
import { alerts } from 'src/app/helpers/alerts';
import { iCampana } from 'src/app/interfaces/iCampana.interface';
import { CampanaService } from 'src/app/services/campana.service';
import { iFiltroCampana } from '../../../interfaces/iResponse.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrearCampanasComponent } from './crear-campanas/crear-campanas.component';
import { MatDialog } from '@angular/material/dialog';

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

  ){

  }

  async ngOnInit() {
    this.rellenarFormulario();  
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

    const iFiltroCampana= {
      fechaFin,
      fechaInicio
    };
    
    await alerts.showLoader();
      const exec = this.campanaService.getDataFilter(iFiltroCampana);
      exec.subscribe(
        async resp=>{
          if(resp.statusCode === 200) {
              this.dataSource = resp.campaigns??[]; 
              
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
}