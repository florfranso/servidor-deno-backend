import { Application, config } from "./depts.ts";
import { productsRouter } from "./routes/product.routes.ts";

const {PORT} = config();

const app = new Application();
const port = parseInt(PORT);

app.use(productsRouter.routes());

app.use((ctx) => {
    ctx.response.body="Bienvenido al servidor de oak"
});



app.listen({port});
console.log(`Server listening on port ${port}`)


