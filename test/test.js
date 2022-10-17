const chai = require("chai")
const server = require("../src/app")
const chaiHttp = require("chai-http")


chai.should()
chai.use(chaiHttp)


describe("Task Api", () => {

    describe("GET /all-order/last-week", () => {
        it("it should get all weeeks orders", (done) => {
            chai.request(server)
                .get("/all-order/last-week")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })
    })
    describe("GET specfic order", () => {
        it("it should get order by id", (done) => {
            const orderId = 1;
            chai.request(server)
                .get("/order/" + orderId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eq(1)
                    res.body.should.have.property('OrderDate').eq("2022-10-16T17:47:16+03:00")
                    res.body.should.have.property('OrderDetail').eq("new order")
                    res.body.should.have.property('Quantity').eq(2)
                    res.body.should.have.property('UnitPrice').eq(2)
                    res.body.should.have.property('Discount').eq(10)
                    done();
                })
        })
        it("it should not GET order by id", (done) => {
            const orderId = 111111;
            chai.request(server)
                .get("/order/" + orderId)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property("message").eq("order with id: 111111 not found!")
                    done();
                })
        })
    })

    describe("POST order", () => {
        it("it should post a new order ", (done) => {
            const order = {
                "OrderDetail": "new order",
                "Quantity": 2,
                "UnitPrice": 2,
                "Discount": 10
            };
            chai.request(server)
                .post("/add-new-order")
                .set("Content-Type", "application/json")
                .send(order)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                })
        })
    })
    describe("PUT change order", () => {
        it("it should not change the order ", (done) => {
            const orderId=111111;
            const order = {
                "OrderDetail": "new order",
                "Quantity": 2,
                "UnitPrice": 2,
                "Discount": 10
            };
            chai.request(server)
                .put("/order/"+orderId)
                .set("Content-Type", "application/json")
                .send(order)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property("message").eq("order with id: 111111 not found!")
                    done();
                })
        })
    })
})