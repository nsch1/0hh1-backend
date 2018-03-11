const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const port = process.env.PORT || 4001

app.use(cors())
app.use(bodyParser.json())

app.listen(port, () => console.log(`Express is listening on port: ${port}`))