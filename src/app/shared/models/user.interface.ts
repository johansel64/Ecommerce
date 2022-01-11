//Se declaran la variables para la intefaces de cada uno de los elementos conectados con el API


export interface User{
    correo: string;
    password: string;
}

export interface UserResponse {
    mensaje: string;
    token: string;
    role: string;
    usuario: string;
}