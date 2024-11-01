import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampanasRoutingModule } from './campanas-routing.module';
import { CampanasComponent } from './campanas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { EditarCampanasComponent } from './editar-campanas/editar-campanas.component';
import { CrearCampanasComponent } from './crear-campanas/crear-campanas.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CampanasComponent,
    EditarCampanasComponent,
    CrearCampanasComponent
  ],
  imports: [
    CommonModule,
    CampanasRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule

  ]
})
export class CampanasModule { }
