const express = require("express");
const cors = require("cors")
const app = express();
sequelize =require('./model/database');
const catchException=require("./middlewares/catchException")
const orderService=require("./services/orderService");

app.use(cors())
app.use(express.json());

sequelize.sync().then(()=>console.log("db is ready"))


app.get(
    "/all-order/:time?",
    catchException(async (req, res) =>{
        const requestedtime= req.params.time;
        res.status(200).send( await orderService.getAllOrderFromPeriodTime(requestedtime))
      
    }) );

app.get(
    "/order/:id",
    catchException(async (req, res) =>{
    const requestedId= req.params.id;
    res.status(200).send(await orderService.getOrderById(requestedId));
}));

app.put(
    "/order/:id",
    catchException(async (req, res) =>{
    const requestedId= req.params.id;
    const newOrder=req.body
    res.status(200).send(await orderService.changeOrderById(requestedId,newOrder));
}));

app.post(
    "/add-new-order", 
    catchException(async (req, res) =>{
    const result=await orderService.createNewOrder(req.body)
    console.log(result)
    res.status(201).send(result);
}));

app.use((error,req,res,next)=>{
    res.status(error.statusCode ||500 ).json({message:error.message})
})

module.exports=app;