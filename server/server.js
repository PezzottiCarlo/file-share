const config = require("./config/config");
const express = require("express");

const filem = new (require("./util/file"))(config.file_path);
const upload = require("multer")();
const app = express();

app.use(express.json());

app.listen(config.port, "0.0.0.0", () => {
  console.log("Server is running on port " + config.port);
  filem.create("adriano.txt", "adriano");
});

app.get("/list", (req, res) => {
  res.json(filem.list());
});

app.get("/download/:fileid", (req, res) => {
  let file_id = req.params.fileid;
  let file_path = filem.getFilePath(file_id);
  if (!file_path) return res.status(404).send("File not found");
  return res.download(file_path);
});

app.post("/delete", (req, res) => {
  let { file_id } = req.body;
  if (filem.delete(file_id)) {
    return res.json({ success: true });
  }
  return res.json({ success: false, message: "File not found" });
});

app.post("/upload", upload.array("files"), (req, res) => {
  if (!req.files) return res.status(400).send("No files were uploaded.");
  req.files.forEach((file) => {
    if (!filem.security_check(file.originalname)) {
      return res.status(400).json({ error: "Invalid file name" });
    }
    if (!filem.create(file.originalname, file.buffer)) {
      return res.json({ success: false, message: "Error creating file" });
    }
  });
  return res.json({ success: true });
});
