import { Component, Inject } from '@angular/core';
import { Campeonato } from '../../shared/entidades/campeonato';
import { Seleccion } from '../../shared/entidades/seleccion';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReferenciasMaterialModule } from '../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

export interface DatosEdicionCampeonato {
  encabezado: string;
  campeonato: Campeonato;
  selecciones: Seleccion[];
}


@Component({
  selector: 'app-campeonato-editar',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgFor
  ],
  templateUrl: './campeonato-editar.component.html',
  styleUrl: './campeonato-editar.component.css'
})
export class CampeonatoEditarComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionCampeonato) {

  }

  compararSelecciones(p1: Seleccion, p2: Seleccion): boolean {
    return p1 && p2 ? p1.id === p2.id : p1 === p2;
  }
}
