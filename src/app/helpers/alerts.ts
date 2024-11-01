//importamos el sweetalert2
import Swal,{SweetAlertIcon} from 'sweetalert2';


export class alerts{
    //funcion para mostrar alertas basicas
    static basicAlert(title: string,text:string,icon:SweetAlertIcon){
        Swal.fire(title,text,icon);
    }

  // Muestra el loader
  static showLoader() {
    Swal.fire({
        title: "Cargando...",
        html: "Espere por favor...",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

// Cierra el loader
static closeLoader() {
    Swal.close();
}
}
