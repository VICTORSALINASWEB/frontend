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


     // Función de confirmación personalizada
     static async confirmarAlert(title: string,text: string): Promise<boolean> {
        const result = await Swal.fire({
            title: title,
            text: text,
            icon: "warning",
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: 'Si',
            denyButtonText: 'Cancelar'
        });

        // Devuelve true si se confirma, false si se niega, o null si se cancela
        return result.isConfirmed ? true : false ;
    }
}
