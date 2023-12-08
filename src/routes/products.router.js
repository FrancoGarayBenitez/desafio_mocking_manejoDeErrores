const { Router } = require('express')
const router = Router()
const productsControllers = require('../controllers/products.controllers')
const { validateParam } = require('../utils')

// Mocking (Crear y obtener lista de productos)
router.get("/mockingproducts", productsControllers.getProducts)

// Obtener un producto por ID
router.get("/:pid", validateParam, productsControllers.getProductById)

module.exports = router