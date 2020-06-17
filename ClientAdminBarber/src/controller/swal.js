import Swal from "sweetalert2";
export function swal(text) {
    Swal.fire({
      title: 'Thành công',
      type: 'success',
      icon: 'success'
    });
  }
 export function swalErr(text) {
    Swal.fire({
      title: 'Thất bại',
      type: 'success',
      icon: 'error'
    });
  }
