const{Sequelize}=require('sequelize');
const { Op } = require('sequelize')
const sequelize =new Sequelize('prod','user','pass',{
    dialect:'sqlite',
    host:'./dev.sqlite'

})
module.exports=sequelize;