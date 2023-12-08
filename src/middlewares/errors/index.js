const EErrors = require('../../services/errors/enums')

module.exports = (error, req, res, next) => {
    console.log(error.cause);

    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.send({status:"error", error:error.name})
            break;
        case EErrors.NOT_EXISTENT_PROPERTY:
            res.send({status:"error", error: error.name})
            break;
        case EErrors.INVALID_PARAM:
            res.send({status:"error", error: error.name})
            break;
        case EErrors.INVALID_QUANTITY:
            res.send({ status: "error", error: error.name })
            break;
        case EErrors.INSUFFICIENT_STOCK:
            res.send({ status: "error", error: error.name })
            break;
        case EErrors.EMPTY_ARRAY_PRODUCTS:
            res.send({ status: "error", error: error.name })
            break;
        default:
            res.send({status:"error", error:"Error desconocido."})
    }
}