import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampanasRoutingModule } from './campanas-routing.module';
import { CampanasComponent } from './campanas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { EditarCampanasComponent } from './editar-campanas/editar-campanas.component';
import { CrearCampanasComponent } from './crear-campanas/crear-campanas.component';
import { MatDialogModule } from '@angular/material/dialog';
//para usar el chips de material
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MensajesCampanasComponent } from './mensajes-campanas/mensajes-campanas.component';
@NgModule({
  declarations: [
    CampanasComponent,
    EditarCampanasComponent,
    CrearCampanasComponent,
    MensajesCampanasComponent
  ],
  imports: [
    CommonModule,
    CampanasRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule

  ]
})
export class CampanasModule { }
