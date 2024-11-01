import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { Error404Component } from './main-page/error404/error404.component';

const routes: Routes = [
  {
		path: '',
		component: MainPageComponent,
		children: [
			{ path: '',title:'Prueba | Home', loadChildren: () => import('./main-page/home/home.module').then(m => m.HomeModule) },
			{ path: 'usuarios',title:'Prueba | Usuarios', loadChildren: () => import('./main-page/usuarios/usuarios.module').then(m => m.UsuariosModule) },
			{ path: 'clientes',title:'Prueba | Clientes', loadChildren: () => import('./main-page/clientes/clientes.module').then(m => m.ClientesModule) },
			{ path: 'campanas',title:'Prueba | Campanas', loadChildren: () => import('./main-page/campanas/campanas.module').then(m => m.CampanasModule) },
			{ path: '**', component: Error404Component }
		]
	}
  ];
  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
