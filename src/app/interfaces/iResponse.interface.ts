import { iCampana } from "./iCampana.interface";
import { iCliente } from "./iCliente.interface";
import { iMensaje } from "./iMensaje.interface";
import { iUsuario } from "./iUsuario.interface";

export interface iResponse{
    message?: string;
    statusCode?: number;
    error?: string;
    aMessage?: iMensaje;
    aMessages?: iMensaje[];
    user?: iUsuario;
    users?: iUsuario[];
    customer?: iCliente;
    customers?: iCliente[];
    campaign?: iCampana;
    campaigns?:iCampana[];
}

export interface iFiltroCampana{
    fechaInicio?: Date;
    fechaFin?: Date;
}

