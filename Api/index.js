require('dotenv').config();
const app = require("./src/app");
const { conn } = require("./src/db");
const { transport } = require("./src/utils/email.utils");
const { PORT } = process.env;


conn.sync({alter: false}).then(async ()=>{
    await transport.verify();
    console.log("nodemailer conectado exitosamente.");
}).then(()=>{
    app.listen(PORT,()=>{
        console.log( "\n" + "%s listening at " + process.env.PORT + "\n" + Date() + "\n" )
    })
}).catch((error) => console.log("Algo salió mal: ", error));
