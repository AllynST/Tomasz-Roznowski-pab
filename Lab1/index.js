var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send(req.query);
});
app.get('/add/:num1/:num2', function (req, res) {
    if (req.query.length > 2) {
        res.send("You have entered too many numbers");
    }
    var num1 = parseInt(req.params.num1);
    var num2 = parseInt(req.params.num2);
    console.log("connection was made");
    res.send(num1 + " + " + num2 + " = " + (num1 + num2));
});
app.get('/subtract/:num1/:num2', function (req, res) {
    if (req.query.length > 2) {
        res.send("You have entered too many numbers");
    }
    var num1 = parseInt(req.params.num1);
    var num2 = parseInt(req.params.num2);
    res.send(num1 + " - " + num2 + " = " + (num1 - num2));
});
app.get('/multiply/:num1/:num2', function (req, res) {
    if (req.query.length > 2) {
        res.send("You have entered too many numbers");
    }
    var num1 = parseInt(req.params.num1);
    var num2 = parseInt(req.params.num2);
    res.send(num1 + " * " + num2 + " = " + (num1 * num2));
});
app.get('/divide/:num1/:num2', function (req, res) {
    if (req.query.length > 2) {
        res.send("You have entered too many numbers");
    }
    var num1 = parseInt(req.params.num1);
    var num2 = parseInt(req.params.num2);
    res.send(num1 + " / " + num2 + " = " + (num1 / num2));
});
app.listen(3000);
