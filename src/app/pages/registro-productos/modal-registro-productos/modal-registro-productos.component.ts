import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { ProductosFormBase } from 'src/app/shared/Utils/productosForms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-registro-productos',
  templateUrl: './modal-registro-productos.component.html',
  styleUrls: ['./modal-registro-productos.component.scss']
})
export class ModalRegistroProductosComponent implements OnInit {
  archivo = '';
  reader: any;
  titulo = "";
  isNew: boolean = false;
  url: any;
  imagenVista = '';
  imagen = this.data?.producto?.URLimagen;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public formProductos: ProductosFormBase,
    private prodService: ProductosService,
    public dialogRef: MatDialogRef<ModalRegistroProductosComponent>
    ) { }

  ngOnInit(): void {
    if (this.data?.producto) {
      this.isNew = false;
      this.titulo = "Modificar Producto";
      this.pathFormData();
    } else {
      this.isNew = true;
      this.titulo = "Crear Producto";
      this.formProductos.reset();
    }
  }


  pathFormData() {
    const { idProducto, nombre, URLimagen, descripcion, cantidad, precioUnitario, tipoProducto, tbUsuario } = this.data?.producto;
    const { nombreTipoProducto } = tipoProducto;
    const { idUsuario } = tbUsuario;
    this.formProductos.baseForm.patchValue({
      idProducto: idProducto,
      nombre: nombre,
      URLimagen: URLimagen,
      descripcion: descripcion,
      cantidad: cantidad,
      precioUnitario: precioUnitario,
      nombreTipoProducto: nombreTipoProducto,
      idUsuario: idUsuario
    })
  }

  cargarImagen(event: any) {
    this.archivo = event.target.files;
    this.reader = new FileReader();
    this.reader.readAsDataURL(this.archivo[0]);
    this.reader.onloadend = () => {
      this.imagenVista = this.reader.result;
    }

  }

  subir() {
    if (this.formProductos.baseForm.valid && this.archivo || this.isNew) {
      this.reader.readAsDataURL(this.archivo[0]);
      this.reader.onloadend = () => {
        this.prodService.udploadFile("imagen_" + Date.now(), this.reader.result).then(urlImagen => {
          this.url = urlImagen;
          if (this.isNew) {
            this.subirProducto(this.url);
          } else {
            this.updateProductoConImagen(this.url);
          }
        });
      }
    } else if (this.formProductos.baseForm.valid && this.imagen) {
      this.updateProducto();
    }
  }

  subirProducto(url: string) {
    const idUser = localStorage.getItem("userId");
    const producto = this.formProductos.baseForm.value;
    if (url) {
      producto.URLimagen = url;
      producto.idUsuario = idUser;
      this.prodService.save(producto).subscribe(data => {
        this.showModal("success", "Producto agregado");
        this.dialogRef.close();
      }, err => {
        this.showModal("error", err);

      });
    }
  }

  updateProductoConImagen(url: string) {
    const producto = this.formProductos.baseForm.value;
    const id = this.data?.producto.idProducto
    if (url) {
      producto.URLimagen = url;
      this.prodService.update(producto, id).subscribe(data => {
        this.showModal("success", "Producto modificado");
        this.dialogRef.close();
      }, err => {
        this.showModal("error", err);
      });
    }
  }

  updateProducto() {
    const producto = this.formProductos.baseForm.value;
    const id = this.data?.producto.idProducto
    producto.URLimagen = this.imagen;
    this.prodService.update(producto, id).subscribe(data => {
      this.showModal("success", "Producto modificado");
      this.dialogRef.close();
    }, err => {
      this.showModal("error", err);
    });
  }

  showModal(icon: any, titulo: string){
    Swal.fire({
      position: 'top-end',
      icon: icon,
      title: titulo,
      showConfirmButton: false,
      timer: 3000
    })
  }


}
