//Se declaran la variables para la intefaces de cada uno de los elementos conectados con el API


export interface productos{
    idProducto: number;
    nombre: string;
    description: string;
    estado: boolean;
    cantidad: number;
    precioUnitario: number;
    codigo: string;
    URLimagen: string;
    idTipoProducto: number;
    nombreTipoProducto: string;
    idUsuario: number;
}


export interface carritoProductos{
    idProducto: number;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    URLimagen: string;
    precioTotal: number;
    cantidadCompra: number;
}

export interface imagenes{
    path: string;
}