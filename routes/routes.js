const fs = require('fs');
const path = require('path');

module.exports = route1 => {

    //  notes variable
    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        // API setup and notes routes
        route1.get("")
    })
}