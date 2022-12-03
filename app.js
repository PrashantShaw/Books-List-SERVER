const express = require('express')
const app = express()
const cors = require('cors')
const authenticateUser = require('./src/auth/auth.js')
const loginRoutes = require('./src/routes/loginRoutes.js')
const booklistRoutes = require('./src/routes/booklistRoutes.js')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/booklist', authenticateUser)

app.use('/user', loginRoutes)
app.use('/booklist', booklistRoutes)


app.get('/', (req, res) => {
    res.send("Working...")
})


module.exports = app