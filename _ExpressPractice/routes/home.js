const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.pug", {
    title: "My Express Practice App",
    message: "Heya!"
  });
});

module.exports = router;
