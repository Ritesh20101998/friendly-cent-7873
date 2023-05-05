let express=require("express");
const passport=require("./google_oauth")
const path = require('path');
const { userRouter } = require("../route/user_route");

let app=express();
// let cors=require("cors");
// app.use(cors)
app.use("/user",userRouter)
app.get("/",(req,res)=>{
    const parentDir = path.resolve(__dirname, '..');
    res.sendFile(parentDir+"\\Frontend\\signup.html")
})


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  app.listen(8090,()=>{
    console.log("Server is running");
  })
