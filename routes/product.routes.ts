import { Router } from "../depts.ts";
import {getAllProducts, getProduct, createProduct, deleteProduct, updateProduct} from '../handlers/products.handler.ts'

export const productsRouter = new Router()
.get("/products", getAllProducts)
.get("/products/:pid", getProduct)
.post("/products", createProduct)
.delete("/products/:pid", deleteProduct)
.put("/products/:pid", updateProduct)