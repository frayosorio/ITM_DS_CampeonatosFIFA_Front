import { Component, Inject } from '@angular/core';
import { ReferenciasMaterialModule } from '../../shared/modulos/referencias-material.module';
import { Seleccion } from '../../shared/entidades/seleccion';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

export interface DatosEdicionSeleccion {
  encabezado: string;
  seleccion: Seleccion;
}

@Component({
  selector: 'app-seleccion-editar',
  imports: [
    ReferenciasMaterialModule,
    FormsModule
  ],
  templateUrl: './seleccion-editar.component.html',
  styleUrl: './seleccion-editar.component.css'
})
export class SeleccionEditarComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionSeleccion) {

  }

}
