export class ClaseCategoria {
    // si no Inicializo los valores, da Error
    // Por eso es el constructor por obligación
    id: number;
    nombre: string;

    // si no Inicializo los valores, da Error
    constructor(obj: any){
        this.id = obj && obj.id || null
        this.nombre = obj && obj.nombre || null
    }
}
  