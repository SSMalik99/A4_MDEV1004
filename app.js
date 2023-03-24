const express = require('express')
require('dotenv').config()
const os = require('os')

const app = express()
const port = process.env.PORT || 3000
const { auth, requiresAuth } = require('express-openid-connect');

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
    
  let loggedIn = req.oidc.isAuthenticated() ? true : false; 

  res.render('Home', {
    title : "Assignment4_MDEV_1004",
    loggedIn : loggedIn
  })
    
})

app.get("/dashboard", requiresAuth(),(req, res) => {
  let loggedIn = req.oidc.isAuthenticated() ? true : false; 
  
  // if (!loggedIn) {
  //   res.redirect("/")
  //   return;
  // }

  
  let user = req.oidc.user

  console.log(JSON.stringify((user)))
  
  res.render('Dashboard', {
    title : "Assignment4_MDEV_1004",
    loggedIn : loggedIn,
    user : user
  })

})

app.listen(port, () => {
    console.log(`App is running at port 3000`)
})