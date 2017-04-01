var express = require('express');
var app = express();
var fs = require("fs");
var sys = require('sys');
var bodyParser = require('body-parser');


app.get('/books', function (req, res) {
    fs.readFile(__dirname + "/" + "book.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

app.get('/books/:id', function (req, res) {

    fs.readFile(__dirname + "/" + "book.json", 'utf8', function (err, data) {
        obj = JSON.parse(data)
        var id = parseInt(req.params.id) - 1
        var book = obj.books[id]
        console.log("id" + id);
        console.log(book);
        res.end(JSON.stringify(book));

    });
})

app.post('/books', function (req, res) {

    var fs = require('fs');
    fs.readFile('book.json', function (err, content) {
        if (err) throw err;
        var parseJson = JSON.parse(content);
        parseJson.books.push({id: 3, name: "Martine à la ferme", category: "Action"})
        fs.writeFile('book.json', JSON.stringify(parseJson), function (err) {
            if (err) throw err;
        })
        console.log("Ajout effectué : ");
        console.log(parseJson);
    })
    res.end();

})

app.delete('/books/:id', function (req, res) {

    var fs = require('fs');
    fs.readFile('book.json', function (err, content) {
        if (err) throw err;
        var parseJson = JSON.parse(content);
        var id = parseInt(req.params.id) - 1
        parseJson.books.splice(id, 1);
        fs.writeFile('book.json', JSON.stringify(parseJson), function (err) {
            if (err) throw err;
        })
        console.log("Suppression effectué : ");
        console.log(parseJson);
    })
    res.end();
})

app.put('/books/:id', function (req, res) {

    var fs = require('fs');
    fs.readFile('book.json', function (err, content) {
        if (err) throw err;
        var parseJson = JSON.parse(content);
        var id = parseInt(req.params.id) - 1
        parseJson.books[id].category = "Enfant";
        fs.writeFile('book.json', JSON.stringify(parseJson), function (err) {
            if (err) throw err;
        })
        console.log("Mise à jour effectué : ");
        console.log(parseJson);
    })
    res.end();
})

app.get('/members/:id/books', function (req, res) {

    fs.readFile(__dirname + "/" + "member.json", 'utf8', function (err, data) {
        obj = JSON.parse(data)
        var id = parseInt(req.params.id) - 1
        var member = obj.members[id]
        console.log("Livre empruntés par "+member.name);
        console.log(member.idBook);
        res.end(JSON.stringify(member.idBook));
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
