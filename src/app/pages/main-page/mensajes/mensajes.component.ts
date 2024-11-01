import { Component, OnInit } from '@angular/core';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit{
  constructor(
    private mensajeService: MensajeService
  ){

  }

  ngOnInit() {
    const exec = this.mensajeService.getData();
    exec.subscribe(
      resp=>{
        console.log(resp);
        
      },
      err=>{
        console.log(err);
        
      }
      
    );
  }
}
