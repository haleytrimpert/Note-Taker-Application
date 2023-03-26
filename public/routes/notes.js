const noteR = require("express").Router();
const path = require("path");
const fs = require("fs");
const util = require("util");
const readFromFile = util.promisify(fs.readFile);
let db = require("../../db/db.json");

noteR.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../notes.html"))
);

noteR.get("/api/notes", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

noteR.post("/api/notes", (req, res) => {
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: db.length + 1,
  };
  console.log(db);
  db.push(newNote);
  console.log(db);
  fs.writeFile(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(db),
    (error) => {
      if (error) {
        console.log(error);
        return;
      }
    }
  );

  res.send(db);
});

noteR.delete("/api/notes/:id", (req, res) => {
  let deleteId = req.params.id;
  let deleteNote = db.filter((note) => {
    return note.id != deleteId;
  });
  db = deleteNote;
  console.log(deleteId);
  console.log(deleteNote);
  fs.writeFile(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(db),
    (error) => {
      if (error) {
        console.log(error);
        return;
      }
      readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
    }
  );
});

module.exports = noteR;
