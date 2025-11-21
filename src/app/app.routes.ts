import { Routes } from '@angular/router';
import { InicioComponent } from '../features/inicio/inicio.component';
import { SeleccionComponent } from '../features/seleccion/seleccion.component';
import { CampeonatoComponent } from '../features/campeonato/campeonato.component';

export const routes: Routes = [
    { path: "", redirectTo: "inicio", pathMatch: "full" },
    { path: "inicio", component: InicioComponent },
    { path: "selecciones", component: SeleccionComponent },
    { path: "campeonatos", component: CampeonatoComponent },
];
