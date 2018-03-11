const Router = require('express').Router
const bcrypt = require('bcrypt')
const {User} = require('../models')
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

module.exports = router