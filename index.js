const express = require("express");
const app = express();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser')
const port = 5000;

app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const json_notes = fs.readFileSync('db/db.json', 'utf-8');
let notes = JSON.parse(json_notes);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.get("/notes", (req, res) => {
    //console.log(__dirname);
    res.sendFile(__dirname + "/public/notes.html");
    //res.render("notes.html");
});

app.get("/api/notes", (req, res) => {
    let json_notes_list = fs.readFileSync('db/db.json', 'utf-8');
    let notesList = JSON.parse(json_notes_list);
    res.json(notesList);
});

app.post("/api/notes", (req, res) => {
    //console.log(req);
    let json_notes_list = fs.readFileSync('db/db.json', 'utf-8');
    let notesList = JSON.parse(json_notes_list);

    console.log(req.body);

    const { title, text } = req.body;

    //console.log(title, text);

    var newNote = {
        id: uuidv4(),
        title,
        text
    };

    // add a new book to the array
    notesList.push(newNote);

    // saving the array in a file
    const json_notes = JSON.stringify(notesList);
    fs.writeFileSync('db/db.json', json_notes, 'utf-8');

    

    res.json({});
});

app.delete('/api/notes/:id', (req, res) => {
    let json_notes_list = fs.readFileSync('db/db.json', 'utf-8');
    let notesList = JSON.parse(json_notes_list);
    notes = notesList.filter(book => book.id != req.params.id);

    // saving data
    const json_notes = JSON.stringify(notes);
    fs.writeFileSync('db/db.json', json_notes, 'utf-8');

    res.json({});
});



app.listen(port, () => {
    console.log("listo! http://localhost:5000");
});