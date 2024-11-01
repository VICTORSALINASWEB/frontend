import { Component, OnInit } from '@angular/core';
import { alerts } from 'src/app/helpers/alerts';
import { iCliente } from 'src/app/interfaces/iCliente.interface';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{
  
  dataSource: iCliente[] =[];
  displayedColumns: string[] = ['index','name', 'status'];
  constructor(
    private clienteService: ClienteService
  ){

  }

  async ngOnInit() {
    await alerts.showLoader();
      const exec = this.clienteService.getData();
      exec.subscribe(
        async resp=>{
          if(resp.statusCode === 200) {
              this.dataSource = resp.customers??[]; 
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
