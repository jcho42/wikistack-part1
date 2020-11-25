const express = require('express');
const router = express.Router();
const { userList, userPages } = require('../views')
const { User, Page } = require('../models')

module.exports = router;

// get /users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    console.error(error)
  }
})

// get /users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const pages =  await Page.findAll({
      where: {authorId: req.params.id}
    })
    res.send(userPages(user, pages));
  } catch (error) {
    console.error(error)
  }
})
