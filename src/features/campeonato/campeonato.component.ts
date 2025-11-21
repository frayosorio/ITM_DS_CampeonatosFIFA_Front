import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { Seleccion } from '../../shared/entidades/seleccion';
import { Campeonato } from '../../shared/entidades/campeonato';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { CampeonatoService } from '../../core/servicios/campeonato.service';
import { SeleccionService } from '../../core/servicios/seleccion.service';
import { MatDialog } from '@angular/material/dialog';
import { CampeonatoEditarComponent } from '../campeonato-editar/campeonato-editar.component';
import { DecidirComponent } from '../../shared/componentes/decidir/decidir.component';

@Component({
  selector: 'app-campeonato',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule
  ],
  templateUrl: './campeonato.component.html',
  styleUrl: './campeonato.component.css'
})
export class CampeonatoComponent {


  public textoBusqueda: string = "";
  public campeonatos: Campeonato[] = [];
  public selecciones: Seleccion[] = [];

  public columnas = [
    { name: "Nombre", prop: "nombre" },
    { name: "País", prop: "paisOrganizador.nombre" },
    { name: "Año", prop: "año" },
  ];
  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public campeonatoEscogida: Campeonato | undefined;
  public indiceCampeonatoEscogido: number = -1;

  constructor(private campeonatoServicio: CampeonatoService,
    private seleccionServicio: SeleccionService,
    public dialogServicio: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.listar();
    this.listarSeleciones();
  }

  escoger(event: any) {
    if (event.type == "click") {
      this.campeonatoEscogida = event.row;
      this.indiceCampeonatoEscogido = this.campeonatos.findIndex(campeonato => campeonato == this.campeonatoEscogida);
    }
  }

  public listar() {
    this.campeonatoServicio.listar().subscribe(
      {
        next: response => {
          this.campeonatos = response;
          this.campeonatos.map(item => { item.year = item.año; });
        },
        error: error => {
          window.alert(error.message);
        }
      }
    );
  }

  public listarSeleciones() {
    this.seleccionServicio.listar().subscribe(
      {
        next: response => {
          this.selecciones = response;
        },
        error: error => {
          window.alert(error.message);
        }
      }
    );
  }

  public buscar() {
    if (this.textoBusqueda) {
      this.campeonatoServicio.buscar(this.textoBusqueda).subscribe({
        next: response => {
          this.campeonatos = response;
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
    else {
      this.listar();
    }
  }
  agregar() {
    const dialogRef = this.dialogServicio.open(CampeonatoEditarComponent, {
      width: '500px',
      height: '400px',
      data: {
        encabezado: "Agregando un nuevo Campeonato",
        campeonato: {
          id: 0,
          nombre: "",
          paisOrganizador: {
            id: 0, nombre: "", entidad: ""
          },
          año: 0, year: new Date().getFullYear()
        },
        selecciones: this.selecciones,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.campeonatoServicio.agregar(datos.campeonato).subscribe({
            next: response => {
              this.campeonatoServicio.buscar(response.nombre).subscribe({
                next: response => {
                  this.campeonatos = response;
                  this.campeonatos.map(item => { item.year = item.año; });
                },
                error: error => {
                  window.alert(error.message);
                }
              });
            },
            error: error => {
              window.alert(error.message);
            }
          });
        }
      },
      error: error => {
        window.alert(error.message);
      }
    }
    );
  }
  modificar() {
    if (this.campeonatoEscogida) {
      const dialogRef = this.dialogServicio.open(CampeonatoEditarComponent, {
        width: '500px',
        height: '400px',
        data: {
          encabezado: `Editando el Campeonato [${this.campeonatoEscogida.nombre}]`,
          campeonato: this.campeonatoEscogida,
          selecciones: this.selecciones,
        },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.campeonatoServicio.modificar(datos.campeonato).subscribe({
              next: response => {
                this.campeonatos[this.indiceCampeonatoEscogido] = response;
                this.campeonatos[this.indiceCampeonatoEscogido].year = response.año;
              },
              error: error => {
                window.alert(error.message);
              }
            });
          }
        }
      });
    }
    else {
      window.alert("Se debe elegir un Campeonato de la lista");
    }
  }
  eliminar() {
    if (this.campeonatoEscogida) {
      const dialogRef = this.dialogServicio.open(DecidirComponent, {
        width: "300px",
        height: "200px",
        data: {
          encabezado: `Está seguro de eliminar el Campeonato [${this.campeonatoEscogida.nombre}]`,
          id: this.campeonatoEscogida.id
        },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.campeonatoServicio.eliminar(datos.id).subscribe({
              next: response => {
                if (response) {
                  this.listar();
                  window.alert("El Campeonato fue eliminado");
                }
                else {
                  window.alert("No se pudo eliminar el Campeonato");
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
    else {
      window.alert("Se debe elegir un Campeonato de la lista");
    }
  }




}
