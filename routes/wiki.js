const express = require("express");
const router = express.Router();
const { addPage, wikiPage, main } = require("../views");
const { Page, User } = require("../models");

// get /wiki
router.get("/", async (req, res, next) => {
  try {
    const allPages = await Page.findAll();
    console.log(allPages)
    res.send(main(allPages));
  } catch (error) {
    console.error(error);
  }
});

// post /wiki
router.post("/", async (req, res, next) => {
  try {
    const { title, content, name, email } = req.body
    // findOrCreate returns an array. The first element is the instance and the second is a boolean, which is true if the instance was newly created or false if it exists.
    let userData = await User.findOrCreate({
      where: {
        name: name,
        email: email
      }
    })

    const page = await Page.create({
      title: title,
      content: content,
    });

    await page.setAuthor(userData[0]);

    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    console.error(error);
  }
});

// get /wiki/add
router.get("/add", async (req, res, next) => {
  try {
    res.send(addPage());
  } catch (error) {
    console.error(error);
  }
});

// get /wiki/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const pageRow = await Page.findOne({
      where: {slug: req.params.slug}
    })
    const author = await pageRow.getAuthor();
    res.send(wikiPage(pageRow, author))
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;
