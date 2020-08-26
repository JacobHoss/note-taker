const fs = require("fs");
const path  = require("path");
const uuidv4 = require('uuid').v4;

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
      fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(error, data) {
        if (error) {
          console.log(error);
          return res.json(error);
        }
        res.json(JSON.parse(data));
        console.log(data)
      });
  });

    app.post("/api/notes", function(req, res) {
      const noteId = uuidv4();
      let userNote = {
        id: noteId,
        title: req.body.title,
        text: req.body.text
      }
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(error, data) {
          if (error) {
            console.log(error);
            return res.json(error);
          }
          console.log(data)
          const rawdata = JSON.parse(data)
          rawdata.push(userNote);
          fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(rawdata), function(err) {
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
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(error, data) {
          const rawdata = JSON.parse(data);
          const newNotes = rawdata.filter(note => userNoteId !== note.id)
          if (error) {
            return console.log(error);
          }
          fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(newNotes), function(err) {
            if (err) {
              console.log(err);
            }
            res.send(newNotes);
            console.log("Successfully delete notes!")
          });
        });
    });
  };