let express=require("express");
const { connection } = require("../register_login/db");
let app=express();
app.use(express.json());
const { userRouter } = require("../register_login/route/user_route");
const cors=require("cors")
app.use(cors())
let cookie_parser=require("cookie-parser");
app.use(cookie_parser());

app.use("/user",userRouter)

app.get("/",(req,res)=>{
    res.sendFile('http://127.0.0.1:5500/Frontend/login.html')
})


// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

  app.listen(8090,async()=>{
    try {
      await connection
      console.log("Connected to DB");
    } catch (error) {
      console.log(error);
    }
    console.log("Server is running");
  })
