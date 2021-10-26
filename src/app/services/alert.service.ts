import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  alertSuccess(data:string){
    return Swal.fire('Thành công', data, 'success')
  }
  alertUpdateSuccess(){
    return Swal.fire('Thành công', 'Cập nhập thành công', 'success')
  }
  alertFail(data:string){
    return Swal.fire('Thất bại', data, 'error')
  }
}
