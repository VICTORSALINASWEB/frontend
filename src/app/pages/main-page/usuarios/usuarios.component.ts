import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { iUsuario } from 'src/app/interfaces/iUsuario.interface';
import { alerts } from 'src/app/helpers/alerts';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{

  dataSource: iUsuario[] =[];
  displayedColumns: string[] = ['index','username'];
  constructor(
    private usuarioService: UsuarioService
  ){

  }

  async ngOnInit() {
    await alerts.showLoader();

    const exec = this.usuarioService.getData();
    exec.subscribe(
      async resp=>{
        if(resp.statusCode === 200) {
          this.dataSource = resp.users??[]; 
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
}
