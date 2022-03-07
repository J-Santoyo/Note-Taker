const fs = require('fs');
const path = require('path');

module.exports = route1 => {

    //  notes variable
    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        // API setup and notes routes
        route1.get("/api/notes", function(req, res) {
            // read the db.json file to return saved notes as JSON
            res.json(notes);
        });
        route1.post("/api/notes", function(req, res) {
            // receives new note, add it to db.json and returns new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            res.json(notes);
        });
    })
}