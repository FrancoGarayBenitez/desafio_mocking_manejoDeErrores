const { Router } = require('express')
const router = Router()
const cartControllers = require('../controllers/cart.controller')
const { validateQuantity, validateParam } = require('../utils')

// Agregar productos al carrito
router.post("/:pid", validateParam, validateQuantity, cartControllers.addProduct)

module.exports = router