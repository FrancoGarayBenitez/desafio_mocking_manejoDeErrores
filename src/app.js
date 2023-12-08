const express = require('express')
const app = express()
const PORT = 8080

//Middleware para analizar el cuerpo de las solicitudes.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const productsRouter = require('./routes/products.router')
const cartRouter = require('./routes/cart.router')

// Middleware para el manejo de errores
const errorHandler = require('./middlewares/errors/index')

app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)
app.use(errorHandler)

//Servidor escuchando
app.listen(PORT, () => {
    console.log(`Servidor is running on port ${PORT}`);
})