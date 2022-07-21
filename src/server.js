const express = require('express')
require('dotenv').config()
const { connect } = require('./db')
const morgan = require('morgan')
const cors = require('cors')
const userRouter = require('./routes/user.routes')
const publicationRouter = require('./routes/publication.routes')
const fileUpload = require('express-fileupload');

const port = process.env.PORT
const app = express()
connect()

app.use(fileUpload())
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/users', userRouter)
app.use('/publications', publicationRouter)

app.listen( port, () => {
  console.log(`App running at http://localhost:${ port }`)
})
