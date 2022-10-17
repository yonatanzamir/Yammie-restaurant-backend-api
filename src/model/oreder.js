const {Model,DataTypes} =require('sequelize')
const sequelize =require('./database')
const moment = require('moment')
class Order extends Model{}
Order.init({
OrderDate:{
    type: 'TIMESTAMP',
    defaultValue: moment().format(),
    allowNull: false
},
OrderDetail:{
    type:DataTypes.STRING
},
Quantity:{
    type:DataTypes.INTEGER
},
UnitPrice:{
    type:DataTypes.INTEGER
},
Discount:{
    type:DataTypes.INTEGER
    }
},
{
sequelize,
modelName:'order',
timestamps:false
})


module.exports=Order;