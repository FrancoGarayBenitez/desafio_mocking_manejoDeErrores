const {faker} = require("@faker-js/faker")
const CustomError = require('./services/errors/CustomError')
const { invalidParam, invalidQuantity } = require('./services/errors/info')
const EErrors = require('./services/errors/enums')

// Comentando alguna propiedad del producto se pondrá en evidencia el error
const createProduct = () => {
    return {
        title: faker.commerce.product(),
        category: faker.commerce.department(),
        price: faker.commerce.price(),
        stock: faker.number.int({ min: 1, max: 100 })
    }
}

const findProduct = (array, pid) => {
    for (let i = 0; i < array.length; i ++) {
        const product = array[i]
        // El triple igual genera error ya que el id generado por faker es de tipo distinto al pid
        if (product.id == pid) {
            return product
        }
    }
}

const validateParam = (req, res, next) => {
    const pid = req.params.pid

    if (!/^\d+$/.test(pid)) {
        CustomError.createError({
            name: "PID no válido",
            cause: invalidParam(pid),
            message: "Error al recibir pid",
            code: EErrors.INVALID_PARAM
        })
    } else {
        next()
    }
}

const validateQuantity = (req, res, next) => {
    const quantity = req.body.quantity

    if ( !quantity || typeof quantity !== "number") {
        CustomError.createError({
            name: "Cantidad no válida",
            cause: invalidQuantity(quantity),
            message: "Error al recibir la cantidad del producto.",
            code: EErrors.INVALID_QUANTITY
        })
    } else {
        next()
    }
}



module.exports = {
    createProduct,
    findProduct,
    validateParam,
    validateQuantity
}