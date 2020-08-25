const notes = require("../db/db.json");
const fs = require("fs");

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
      res.json(notes);
    });
  
    app.post("/api/notes", function(req, res) {
      const noteId = uuidv4();
      let userNote = {
        id: noteId,
        title: req.body.title,
        text: req.body.text
      }
        fs.readFile("../db/db.json", "utf8", function(error, data) {
          const rawdata = JSON.parse(data)
          rawdata.push(userNote);
          if (error) {
            return console.log(error);
          }
          fs.writeFile("../db/db.json", JSON.stringify(userNote), "utf8", function(err) {
            if (err) {
              console.log(err);
            }
            res.send(userNote);
            console.log("Successfully created note!")
          });
        });
    });
  
    app.delete("/api/notes/:id", function(req, res) {
      let userNoteId = req.params.id;
        fs.readFile("../db/db.json", "utf8", function(error, data) {
          const rawdata = JSON.parse(data);
          const newNotes = rawdata.filter(note => note.id !== noteId)
          if (error) {
            return console.log(error);
          }
          fs.writeFile("../db/db.json", JSON.stringify(newNotes), "utf8", function(err) {
            if (err) {
              console.log(err);
            }
            res.send(newNotes);
            console.log("Successfully delete notes!")
          });
        });
    });
  };