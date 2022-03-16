"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.get('/', function (req, res) {
    res.send('GET Hello World');
});
app.post('/', function (req, res) {
    console.log(req.body); // e.x. req.body.title 
    res.status(200).send('POST Hello World');
});
app.listen(3000);
