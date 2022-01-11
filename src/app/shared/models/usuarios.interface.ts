//Se declaran la variables para la intefaces de cada uno de los elementos conectados con el API


export interface Usuarios{
    id: number,
    nombreUsuario: string,
    correo: string,
    role: string,
    persona:{
        nombre: string,
        apellido1: string,
        apellido2: string,
        fechaNac: Date,
        telefono: string
    },
    direccion:{
        provincia: string,
        canton: string,
        ubicacionExacta: string
    }
}