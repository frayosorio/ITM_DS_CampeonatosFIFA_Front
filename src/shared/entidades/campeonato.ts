import { Seleccion } from "./seleccion";

export interface Campeonato {
    id: number;
    nombre: string;
    año: number;
    year: number;
    paisOrganizador: Seleccion;
}