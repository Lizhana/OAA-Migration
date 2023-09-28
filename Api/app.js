//Configuración del servidor con Express
require("dotenv").config();                         //Requerimos el .env
const express = require("express");                 //Requerimos Express
const cors = require("cors");                       //Requerimos 'cors
const routes = require("../Api/src/routes/index");           //rutas del Backend en el index
require("dotenv").config();
const { CLIENT_URL } = process.env;
const app = express();


app.use(express.json());                            //Parseamos toda la información
app.use(express.urlencoded({ extended: true }));
app.use(                                            //Políticas 'cors'
    cors({
        origin: CLIENT_URL,
        methods: "GET, POST, PUT, DELETE",
        credentials: true,
    })
);

app.use((req, res, next) => {
    res.header( "Access-Control-Allow-Origin", CLIENT_URL );
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});


app.use("/", routes);


module.exports = app;