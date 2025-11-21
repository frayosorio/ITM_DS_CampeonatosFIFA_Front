import { Component, OnInit } from '@angular/core';
import { ReferenciasMaterialModule } from '../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { SeleccionService } from '../../core/servicios/seleccion.service';
import { Seleccion } from '../../shared/entidades/seleccion';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionEditarComponent } from '../seleccion-editar/seleccion-editar.component';
import { DecidirComponent } from '../../shared/componentes/decidir/decidir.component';

@Component({
  selector: 'app-seleccion',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule,
  ],
  templateUrl: './seleccion.component.html',
  styleUrl: './seleccion.component.css'
})
export class SeleccionComponent implements OnInit {

  public textoBusqueda: string = "";
  public selecciones: Seleccion[] = [];

  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "Entidad", prop: "entidad" }
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public seleccionEscogida: Seleccion | undefined;
  public indiceSeleccionEscogida: number = -1;

  constructor(private seleccionServicio: SeleccionService,
    public dialogServicio: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.listar();
  }



  escoger(event: any) {
    if (event.type == "click") {
      this.seleccionEscogida = event.row;
      this.indiceSeleccionEscogida = this.selecciones.findIndex(seleccion => seleccion == this.seleccionEscogida);
    }
  }

  public listar() {
    this.seleccionServicio.listar().subscribe({
      next: (response) => {
        this.selecciones = response;
      },
      error: (error) => {
        window.alert(error.message);
      }
    });
  }

  public buscar() {
    if (this.textoBusqueda) {
      this.seleccionServicio.buscar(this.textoBusqueda).subscribe({
        next: response => {
          this.selecciones = response;
        },
        error: error => {
          window.alert(error);
        }
      });
    }
    else {
      this.listar();
    }
  }

  public agregar() {
    const cuadroDialogo = this.dialogServicio.open(SeleccionEditarComponent, {
      width: '500px',
      height: '300px',
      data: {
        encabezado: "Agregando nueva selección de fútbol",
        seleccion: {
          id: 0,
          nombre: "",
          entidad: ""
        }
      },
      disableClose: true,
    });

    cuadroDialogo.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.seleccionServicio.agregar(data.seleccion).subscribe({
            next: (response) => {
              this.seleccionServicio.buscar(response.nombre).subscribe({
                next: response => {
                  this.selecciones = response;
                },
                error: error => {
                  window.alert(error);
                }
              });
            },
            error: (error) => {
              window.alert(error.message);
            }
          });
        }
      },
      error: (error) => {
        window.alert(error);
      }
    });
  }

  public modificar() {
    if (this.seleccionEscogida) {
      const cuadroDialogo = this.dialogServicio.open(SeleccionEditarComponent, {
        width: '500px',
        height: '300px',
        data: {
          encabezado: `Modificando la selección de fútbol [${this.seleccionEscogida.nombre}]`,
          seleccion: this.seleccionEscogida
        },
        disableClose: true,
      });

      cuadroDialogo.afterClosed().subscribe({
        next: (data) => {
          if (data) {
            this.seleccionServicio.modificar(data.seleccion).subscribe({
              next: (response) => {
                this.selecciones[this.indiceSeleccionEscogida] = response;
              },
              error: (error) => {
                window.alert(error.message);
              }
            });
          }
        },
        error: (error) => {
          window.alert(error);
        }
      });

    }
  }

  public eliminar() {
    if (this.seleccionEscogida) {
      const cuadroDialogo = this.dialogServicio.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        data: {
          encabezado: `Está seguro de eliminar la Selección [${this.seleccionEscogida.nombre}]`,
          id: this.seleccionEscogida.id
        },
        disableClose: true,
      });

      cuadroDialogo.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.seleccionServicio.eliminar(datos.id).subscribe({
              next: response => {
                if (response) {
                  this.listar();
                  window.alert("La selección fue eliminada");
                }
                else {
                  window.alert("No se pudo eliminar la selección");
                }
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        }
      });
    }
  }

}
