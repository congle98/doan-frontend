import { Injectable } from '@angular/core';
import Swal from "sweetalert2";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private messageService:MessageService) { }
  alertSuccess(data:string){
    // return Swal.fire('Thành công', data, 'success');
    this.messageService.add({
      severity:'success', summary:"Thành công",detail:data
    })
  }
  alertUpdateSuccess(){
    // return Swal.fire('Thành công', 'Cập nhập thành công', 'success')
    this.messageService.add({
      severity:'success', summary:"Thành công",detail:"cập nhật thành công"
    })
  }
  alertFail(data:string){
    // return Swal.fire('Thất bại', data, 'error')
    this.messageService.add({
      severity:'error', summary:"Thất bại",detail:data
    })
  }
}
