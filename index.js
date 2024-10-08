require("dotenv").config();
const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect")
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
const PORT = process.env.PORT || 8000;

connectToMongoDB(process.env.MONGO_URL).then(()=>console.log("Mongodb connected"));

app.use("/",urlRoute);

app.listen(PORT,()=>console.log(`Server on port ${PORT}`));