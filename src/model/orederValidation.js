const Joi= require('joi')

function createOrderScheme(order){
    const orderSceme=Joi.object({
        id: Joi.forbidden(),
        OrderDate:Joi.date().iso().less(new Date()),
        UnitPrice: Joi.number().required().min(1).max(100000),
        OrderDetail: Joi.string().required().min(2).max(100),
        Quantity: Joi.number().required().min(1).max(10000),
        Discount: Joi.number().required().min(0).max(99)
    })
  return orderSceme;
}

function validateNewOrder(orderSceme,newOrderRequest){
    return orderSceme.validate(newOrderRequest);
}
module.exports={createOrderScheme,validateNewOrder};