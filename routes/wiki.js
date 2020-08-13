const express = require("express");
const router = express.Router();
const { addPage } = require("../views");
const { Page } = require("../models");

// router get /wiki
router.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
  }
});

// router post /wiki
router.post("/", async (req, res, next) => {
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
});

// router get /wiki/add
router.get("/add", async (req, res, next) => {
  try {
    res.send(addPage());
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
