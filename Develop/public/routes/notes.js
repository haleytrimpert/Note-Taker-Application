const noteR = require("express").Router();
const path = require("path");
const fs = require("fs");

noteR.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../notes.html"))
);

noteR.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../../db/db.json"))
);

noteR.post("/api/notes", (req, res) => {
  //hit the save button,request info sent to bd.json, apply to notes.html
  fs.readFile(path.join(__dirname, "../../db/db.json"), (error, data) => {
    const json = JSON.parse(data);
    json.push(req.body);
    fs.writeFile(
      path.join(__dirname, "../../db/db.json"),
      JSON.stringify(json),
      (error) => {
        if (error) {
          console.log(error);
          return;
        }
      }
    );
  });
  return res.sendFile(path.join(__dirname, "../../db/db.json"));
});

noteR.delete("/api/notes", (req, res) =>
  res.deleteFile(path.join(__dirname, "../../db/db.json"))
);

module.exports = noteR;
