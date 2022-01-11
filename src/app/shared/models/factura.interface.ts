//Se declaran la variables para la intefaces de cada uno de los elementos conectados con el API

export interface FacturaCarrito {
    idProducto: number;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    URLimagen: string;
    precioTotal: number;
}

export interface Factura {
    idFactura: number;
    totalFactura: number;
    idUsuarioFk: number;
    
}

export interface DetalleFactura {
    idDetalleFactura: number;
    cantidadProducto: number;
    idFactura: number;
    idProducto: number;
}