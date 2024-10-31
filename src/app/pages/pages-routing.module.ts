import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { Error404Component } from './main-page/error404/error404.component';

const routes: Routes = [
  {
		path: '',
		component: MainPageComponent,
		children: [
			{ path: '', loadChildren: () => import('./main-page/home/home.module').then(m => m.HomeModule) },
			{ path: 'usuarios', loadChildren: () => import('./main-page/usuarios/usuarios.module').then(m => m.UsuariosModule) },
			{ path: 'clientes', loadChildren: () => import('./main-page/clientes/clientes.module').then(m => m.ClientesModule) },
			{ path: 'campanas', loadChildren: () => import('./main-page/campanas/campanas.module').then(m => m.CampanasModule) },
			{ path: 'mensajes', loadChildren: () => import('./main-page/mensajes/mensajes.module').then(m => m.MensajesModule) },
			{ path: '**', component: Error404Component }
		]
	}
  ];
  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }