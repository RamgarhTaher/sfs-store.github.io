require("./db_connector")
const express = require("express");
const app = express();
const hbs = require("hbs");
const cookiesParser = require('cookie-parser');
const {router} = require('./routers/main_router');

const port = process.env.PORT || 5000;
const viewsPath =  `${__dirname}/templates/views`;
const partialsPath =  `${__dirname}/templates/partials`;
const staticPath =  `${__dirname}/public`;

app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.set("view engine", "hbs");
app.use(express.static(staticPath));
app.use(cookiesParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);




app.listen(port, () => {
    console.log(`The port number ${port}`);
})