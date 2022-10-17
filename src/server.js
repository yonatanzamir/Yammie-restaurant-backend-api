const app = require("./app");
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`app is listening on port ${port}`);
});
