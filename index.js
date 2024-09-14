console.log("Uploading Files in web");
const multer = require("multer");
const path = require("path");
const express = require("express");

const app = express();
const PORT = 8000;
// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage");
});

// post request
app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});
app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
