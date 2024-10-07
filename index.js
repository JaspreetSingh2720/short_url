const express = require("express");
const app = express();

const {connectToMongoDb} = require("./config/connection");

const path = require("path");
const cookieParser = require("cookie-parser");
const {checkForAuthentication,restrictTo} = require("./middlewares/auth");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const morgan = require("morgan");

const PORT = 8002;

connectToMongoDb("mongodb://localhost:27017/short-url")
.then(()=>console.log("MongoDb connected"))
.catch((err)=>console.log(`connection failed err : ${err}`));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkForAuthentication);


app.use("/url",restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/", restrictTo(["ADMIN"]), staticRoute);
// app.use("/", staticRoute);
app.use("/user", userRoute);


app.listen(PORT, ()=> console.log(`server started at port : ${PORT}`));
