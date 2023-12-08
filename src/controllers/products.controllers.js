const CustomError = require('../services/errors/CustomError')
const EErrors = require('../services/errors/enums')
const {createProduct, findProduct } = require('../utils')
const { generateProductErrorInfo } = require('../services/errors/info')

let products = []

// Crear y obtener productos
const getProducts = (req, res ) => {

    for ( let i = 0; i < 100; i++) {
        let generatedProduct = createProduct()
        let {title, category, price, stock} = generatedProduct

        // Instancia para crear el error
        if (!title || !category || !price || !stock) {
            CustomError.createError({
                name: "Error en la creación del producto",
                cause: generateProductErrorInfo({ title, category, price, stock }),
                message: "Error al intentar crear un producto",
                code: EErrors.NOT_EXISTENT_PROPERTY
            })
        }

        // Id autoincrementable
        if (products.length === 0) {
            generatedProduct.id = 1
        } else {
            generatedProduct.id = products[products.length - 1].id + 1
        }

        // Si no hay error se agregará el producto al array y se crearán 99 más
        products.push(generatedProduct)
    }

    res.status(200).json({status:"Success", payload: products})
}


// Obtener producto por su ID
const getProductById = (req, res) => {
    const {pid} = req.params

    let product = findProduct(products, pid)

    res.status(200).json({status:"Success", payload: product})
}




module.exports = {getProducts, getProductById, products}

