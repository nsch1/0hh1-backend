const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const userRouter = require('./user/router')

const port = process.env.PORT || 4001

app.use(cors())
app.use(bodyParser.json())
app.use(function (req, res, next) {
  if (!req.headers.authorization) return next()

  const auth = req.headers.authorization.split(' ')
  if (auth[0] === 'Bearer') {
    verify(auth[1], function (err, jwt) {
      if (err) {
        console.error(err)
        res.status(400).send({
          message: "JWT token invalid"
        })
      }
      else {
        User
          .findById(jwt.data.id)
          .then(entity => {
            req.user = entity
            next()
          })
          .catch(err => {
            console.error(err)
            res.status(500).send({
              message: 'Something went horribly wrong'
            })
          })
      }
    })
  }
  else next()
})
app.use(userRouter)

app.listen(port, () => console.log(`Express is listening on port: ${port}`))