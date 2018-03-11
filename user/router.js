const Router = require('express').Router
const bcrypt = require('bcrypt')
const {User, Game} = require('../models')
const {sign} = require('../jwt')

const router = new Router()

router.post('/logins', (req, res) => {
  User
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          jwt: sign(user.id)
        })
      }
      else {
        res.status(400).send({ message: 'Incorrect password' })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({
        message: "Something went wrong."
      })
    })
})

router.get('/games/:id', (req, res) => {
  Game
    .findOne({
      where: {
        user: req.params.id
      }
    })
    .then(game => {
      res.json(game)
    })
})

module.exports = router