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

        // retrieves note wirth specific id
        route1.get("/api/notes/:id", function(req, res) {
            res.json(notes[req.params.id]);
        });

        // BONUS Deletes notes with specific id
        route1.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            res.json(notes);
        });

        // Display notes.html when notes is accessed
        route1.get('/notes', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        // updates json file when note is added or deleted

        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }
    });
}