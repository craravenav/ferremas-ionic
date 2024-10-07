export class ClaseProducto {
    // si no Inicializo los valores, da Error
    // Por eso es el constructor por obligación
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria_id: number;
    marca_id:number;
    stock: number;
  
    // si no Inicializo los valores, da Error
    constructor(obj: any){
        this.id = obj && obj.id || null
        this.nombre = obj && obj.nombre || null
        this.descripcion = obj && obj.descripcion || null
        this.precio = obj && obj.precio || null
        this.imagen = obj && obj.imagen || null
        this.categoria_id = obj && obj.categoria_id || null
        this.marca_id  = obj && obj.marca_id || null
        this.stock  = obj && obj.stock || null
    }
}
  