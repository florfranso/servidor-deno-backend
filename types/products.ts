import { ObjectId } from '../depts.ts'

export interface Product {
    _id: ObjectId;
    nombre: string;
    precio: number;
    imagen: string;
}