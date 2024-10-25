export class ClaseProducto {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria_id: number;
    marca_id: number;
    stock: number;

    constructor(obj: any = {}) {
        // Inicializamos valores con obj si existe, de lo contrario con valores por defecto
        this.id = obj.id || 0; // Usamos 0 como valor por defecto para `id`
        this.nombre = obj.nombre || ''; // Cadena vacía como valor por defecto
        this.descripcion = obj.descripcion || '';
        this.precio = obj.precio || 0; // Precio predeterminado 0
        this.imagen = obj.imagen || '';
        this.categoria_id = obj.categoria_id || 0;
        this.marca_id = obj.marca_id || 0;
        this.stock = obj.stock || 0;
    }
}