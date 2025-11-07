import { Routes } from '@angular/router';
import { InicioComponent } from '../features/inicio/inicio.component';

export const routes: Routes = [
    { path: "", redirectTo: "inicio", pathMatch: "full" },
    { path: "inicio", component: InicioComponent },
];
