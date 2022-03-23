"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
var date = new Date();
var Note = /** @class */ (function () {
    function Note(title, content, createDate, tags, id) {
        if (id === undefined) {
            this.id = Date.now();
        }
        else {
            this.id = id;
        }
        this.title = title;
        this.content = content;
        this.createDate = createDate;
        this.tags = tags;
    }
    return Note;
}());
var notes = [
    new Note("TEST1", "TEST1", "test1", ["test1"], 1),
    new Note("TEST2", "TEST2", "test2", ["test2"], 2),
    new Note("TEST1", "TEST1", "test1", ["test1"], 3),
    new Note("TEST1", "TEST1", "test1", ["test1"], 4),
];
app.use(express_1["default"].json());
console.log(notes[0].id);
app.get('/notes/:id', function (req, res) {
    res.send(notes.find(function (note) { return note.id === +req.params.id; }));
});
app.post('/notes', function (req, res) {
    var addedObject = new Note(req.body.title, req.body.content, req.body.createDate, req.body.tags);
    notes.push(addedObject);
    res.send("Your object was created at ".concat(addedObject.id));
});
app.put('/notes/:id', function (req, res) {
    var ChangeIndex = notes.findIndex(function (note) { return note.id == +req.params.id; });
    notes[ChangeIndex] = req.body;
    res.send("Your object was changed to ".concat(JSON.stringify(notes[3])));
});
app["delete"]('/notes/:id', function (req, res) {
    var deleteIndex = notes.findIndex(function (note) { return note.id == +req.params.id; });
    res.send("Your object was deleted at ".concat(notes[deleteIndex].id));
    notes.splice(deleteIndex, 1);
});
app.listen(3000);
