const moment = require('moment')
const Order = require('../model/oreder')
const { Op } = require('sequelize');
const ErrorWithStatusCode = require('../errors/ErrorWithStatusCode');
const { adjustTimePattern } = require("../utils/dateParser");
const { validateNewOrder, createOrderScheme } = require("../model/orederValidation");
const Joi = require('joi');



async function createNewOrder(order) {

    CreationAndValidationNewOrder(order);
    return await Order.create(order).then(() => {
        return JSON.stringify(order);

    })
}

async function changeOrderById(requestedId, newOrder) {
    CreationAndValidationNewOrder(newOrder);
    const order = await getOrderById(requestedId);
    const orderTime = order.OrderDate
    const newOrderTime = moment(adjustTimePattern(orderTime))
    const FifteenMinutesAgo = moment().subtract(15, 'minutes')
    if (FifteenMinutesAgo.isAfter(newOrderTime)) {
        throw new ErrorWithStatusCode("The order was made more than fifteen minutes ago !", 403);
    }
    else {
        return await order.update(newOrder).then(() => {
            return 'order updated !'
        })
    }
}

async function getOrderById(requestedId) {
    const order = await Order.findOne({ where: { id: requestedId } })
    if (!order) {
        throw new ErrorWithStatusCode("order with id: " + requestedId + " not found!", 404);
    }
    return order
}

async function getAllOrderFromPeriodTime(periodTime) {
    if (periodTime == undefined) {
        return (await Order.findAll())
    }
    else if (periodTime == "last-day") {
        return (getAllOrderFromPeriodTimeFromDb("weeks"))
    }
    else if (periodTime == "last-week") {
        console.log(moment().format())
        return (getAllOrderFromPeriodTimeFromDb("weeks"))
    }
    else if (periodTime == "last-month") {
        return (getAllOrderFromPeriodTimeFromDb("mounths"))
    }
}
async function getAllOrderFromPeriodTimeFromDb(periodTime) {
    return (await Order.findAll({
        where: {
            OrderDate: {
                [Op.gt]: moment().subtract(1, 'periodTime').toDate()
            }
        }
    }))
}
function CreationAndValidationNewOrder(newOrder){
    const orderScheme = createOrderScheme()
    const validation = validateNewOrder(orderScheme, newOrder)
    if (validation.error) {
        throw new ErrorWithStatusCode(validation.error.details[0].message, 400);
    }
}
module.exports = { getAllOrderFromPeriodTime, getOrderById, changeOrderById, createNewOrder };