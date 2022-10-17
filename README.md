# Yammie-restaurant-backend-api
# Yammie Backend Api
Backend API for manage restaurant orders

### Built With
[![NODE.js][node.js]][node-url]


## Features
- Fundamental of Express: routing, middleware, sending response and more
- Error handling
- Enviroment Varaibles
- Catching Uncaught Exception

### Project Structure
- server.js : Responsible for starting the server.
- app.js : Configure everything that has to do with Express application, Contain callback functions that corresponds to the routers to handle requests.
- models : init DB configuration, order database scheme, validating order input data
- .env : for Enviroment Varaiables
- services: contain the majority of the business logic
- errors, middleware :  Responsible for error system

### Implemented endpoints:

Path | Method | Description
---|---|---
/all-order/:time | GET | ListOrderFromPeriodTime
/order/:id | GET | GetSpecficOrder
/order/:id | PUT | ChangeSpecficOrder
/add-new-order | POST | CreateNewOrder


## Usage

* Clone the repository, install node packages and verify routes locally

```bash
git clone https://github.com/yonatanzamir/Yammie-restaurant-backend-api/
cd Yammie-restaurant-backend-api/
npm install
npm start
```





[node.js]: https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/180px-Node.js_logo.svg.png
[node-url]: https://nodejs.org/en/
