const CustomError = require('../services/errors/CustomError')
const EErrors = require('../services/errors/enums')
const { insufficientStock, emptyProducts } = require('../services/errors/info')
const { products } = require('../controllers/products.controllers')
const { findProduct } = require('../utils')

let cart = {
    products: [],
    totalPrice: 0
}

const addProduct = (req, res) => {
    let pid = req.params.pid
    let quantity = req.body.quantity

    if (products.length == 0) {
        CustomError.createError({
            name: "No hay productos",
            cause: emptyProducts(),
            message: "Array de productos vacío",
            code: EErrors.EMPTY_ARRAY_PRODUCTS
        })
    }

    let product = findProduct(products, pid)

    // Validar si ya existe el producto en el cart
    let foundProductInCart = cart.products.find((p) => {
        return p.product.id == pid
    })

    if (product.stock >= quantity) {
        // Precio total
        cart.totalPrice += quantity * product.price
    
        // Actualizar stock del producto
        product.stock -= quantity
        
        // Actualizar producto en el array products
        for (let i = 0; i < products.length; i ++) {
            if (products[i].id == pid) {
                products.splice(i, 1, product)
            }
        }

        if (foundProductInCart) {
            // Índice del producto en el carrito
            const indexProduct = cart.products.findIndex((p) => p.product.id == pid)

            // Actualizar cantidad del producto en el carrito
            cart.products[indexProduct].quantity += quantity

        } else {
            // Agregar al carrito
            cart.products.push({product, quantity: quantity})
        }

    } else {
        CustomError.createError({
            name: "Error al agregar producto al carrito.",
            cause: insufficientStock(product, quantity),
            message: "Error al agregar producto al carrito",
            code: EErrors.INSUFFICIENT_STOCK
        })
    }

    res.status(200).json({message: "Success", payload: cart})
}


module.exports = {addProduct}