const express = require("express")
const {connection} = require("./db")
require("dotenv").config() 
// const {blogRouter} = require("./routes/blog.routes")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// const {auth} = require("./middleware/auth.middleware")

const app = express()

app.use(express.json())

// //////////// Git Hub O-Auth ////////////

// app.get("/login", (req,res)=>{
//     res.sendFile(__dirname + "/index.html")
// })

// app.get("/auth/github", async (req,res)=>{
//     const {code} = req.query
//     console.log(code)
//     const accessToken = await fetch("https://github.com/login/oauth/access_token",{
//         method : "POST",
//         headers : {
//             Accept : "application/json",
//             "content-type": "application/json"
//         },
//         body :JSON.stringify({
//             client_id : process.env.client_id,
//             client_secret : process.env.client_secret,
//             code
//         })
//     }).then((res)=> res.json())

//     const user = await fetch("https://api.github.com/user", {
//         headers : {
//             Authorization : `Bearer ${accessToken.access_token}`
//         }
//     })
//     .then((res)=> res.json())
//     .catch((err)=> console.log(err))

//     console.log(user)

//     const useremailis = await fetch("https://api.github.com/user/emails", {
//         headers : {
//             Authorization : `Bearer ${accessToken.access_token}`
//         }
//     })
//     .then((res) => res.json())
//     .catch((err) => console.log(err))

//     console.log(useremailis)
    
//     res.send(`Hello ..! ${user.name}, You Successfully Sign in with Github`)
// })


//////////// Google O-Auth /////////////
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport")

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8090/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log(accessToken, refreshToken, profile)
    return cb (`Hello ${profile._json.name} ..!, You Successfully Sign in with Google`)
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session: false }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


//////////// Facebook O-Auth /////////////
// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:5050/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));


// app.use(auth)
// app.use("/blogs", blogRouter)



app.listen(process.env.port, async()=>{
    try {
        await connection
        // connection.disconnect
        console.log("Connected to Mongo")
    } catch (err) {
        console.log("Not connected to Mongo")
        console.log(err)
    }
    console.log('Server is running')
})