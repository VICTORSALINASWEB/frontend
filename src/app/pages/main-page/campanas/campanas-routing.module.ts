import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampanasComponent } from './campanas.component';

const routes: Routes = [
  { path: '', component: CampanasComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampanasRoutingModule { }
