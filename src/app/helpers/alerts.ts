//importamos el sweetalert2
import Swal,{SweetAlertIcon} from 'sweetalert2';


export class alerts{
    //funcion para mostrar alertas basicas
    static basicAlert(title: string,text:string,icon:SweetAlertIcon){
        Swal.fire(title,text,icon);
    }
}
