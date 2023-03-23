const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const { auth } = require('express-openid-connect');

app.set('view engine', 'ejs');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASEURL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));





app.get("/", (req, res) => {
    res.send("Welcom to mdev 1004")
})

app.listen(port, () => {
    console.log(`App is running at port 3000`)
})