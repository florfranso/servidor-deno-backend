import { Context, helpers, MongoClient, ObjectId, config } from '../depts.ts'
import { Product } from '../types/products.ts';

const {MONGO_URL, MONGO_DB_NAME} = config();
console.log(MONGO_URL)

const client = new MongoClient();

try {
    await client.connect(MONGO_URL)
    console.log('Base de datos conectada')
} catch (error) {
    console.log(error.message)
}

const db = client.database(MONGO_DB_NAME);
const productModel = db.collection<Product>("productos");

export const getAllProducts = async (ctx: Context) => {
    try {
        const products = await productModel.find().toArray();
        ctx.response.status = 200;
        ctx.response.body = {status: 'success', data: products}
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = {status: 'error', message: error.message}
    } 
};

export const getProduct = async (ctx: Context) => {
        try {
        const {pid} = helpers.getQuery(ctx, {mergeParams:true});
        const product = await productModel.findOne({_id: new ObjectId(pid)});
        if(product) {
            ctx.response.body = {status: 'success', data: product}
        } else {
            ctx.response.body = {status: 'error', message: 'el producto no existe'}
        }
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = {status: 'error', message: error.message}
    } 
};

export const createProduct = async (ctx: Context) => {
        try {
        const {nombre, precio, imagen} = await ctx.request.body().value;
        const newProduct = {
            nombre: nombre,
            precio: precio,
            imagen: imagen
        }
        const productCreated = await productModel.insertOne(newProduct);
        ctx.response.body = {status: 'success', data: productCreated}
        
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = {status: 'error', message: error.message}
    } 
};

export const deleteProduct = async (ctx: Context) => {
        try {
        const {pid} = helpers.getQuery(ctx, {mergeParams:true});
        const product = await productModel.deleteOne({_id: new ObjectId(pid)});
        if(product) {
            ctx.response.body = {status: 'success', message: 'producto borrado exitosamente'}
        } else {
            ctx.response.body = {status: 'error', message: 'el producto no existe'}
        }
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = {status: 'error', message: error.message}
    } 
}

export const updateProduct = async (ctx: Context) => {
        try {
        const {pid} = helpers.getQuery(ctx, {mergeParams: true});
        const {nombre, precio, imagen} = await ctx.request.body().value;
        const productData = {
            nombre: nombre,
            precio: precio,
            imagen: imagen
        }
        await productModel.updateOne({_id: new ObjectId(pid)}, {$set: {nombre: productData.nombre, precio: productData.precio, imagen: productData.imagen}})
        ctx.response.status = 200;
        ctx.response.body = {status: 'success', message: 'producto actualizado en la base de datos'};
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = {status: 'error', message: error.message}
    } 
}