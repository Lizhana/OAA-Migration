const nodemailer = require('nodemailer');
require('dotenv').config();
const { NODEMAILER_PASSWORD, NODEMAILER_USER } = process.env;


module.exports = {
    transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NODEMAILER_USER,
            pass: NODEMAILER_PASSWORD,
        },
    }),

    mailWelcome: ( email ) => {
        return {
            from: NODEMAILER_USER,
            to: email,
            subject: `¡Bienvenid@ al Newsletter de OAA!`,
            html: `
                <p>Te damos la bienvenida al Newsletters de la Organización de Ambientalistas Autoconvocados</p>
                <br/>
                <p><b>Nos encontramos muy felices de que desees hacer parte de esta comunidad.</b></p>
                <p>Contamos con el apoyo de la comunidad para hacer frente a nuestras necesidades, nuestra voz debe ser escuchada, trabajemos juntos para lograrlo.></img>
            `
        }
    },
};