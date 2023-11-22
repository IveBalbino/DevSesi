const { json } = require('express');

const app = require('express')();

const router = require('./src/routers/Router');

const port = 3000;

app.use(json());
app.use("/", router);

app.listen(port, () => {
    console.log("Servidor de API em funcionamento!!!");
});