require("dotenv").config()
const express = require("express");
const path = require('path');
const hbs = require('hbs')
const bcrypt = require("bcryptjs");
require('./db/conn')
const Register = require('./module/register')
const app = express();
const port = process.env.PORT || 4500;

// path set
const staticPath =  path.join(__dirname, "../public");
const tamplateView =  path.join(__dirname, "../tamplate/views")
 const tamplatePartials =  path.join(__dirname, "../tamplate/partials")

app.use(express.static(staticPath));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine", "hbs");
app.set('views', tamplateView)
hbs.registerPartials(tamplatePartials);

console.log(process.env.SECRET_KEY)

// router
app.get('/', (req, res)=>{
    res.render("index",{
        title:"zillaOnline"
    })
})
app.get('/about', (req, res)=>{
    res.render("about",{
        title:"About Us"
    })
})
app.get('/contact', (req, res)=>{
    res.render("contact",{
        title:"Contact Us"
    })
})
app.get('/ourgame', (req, res)=>{
    res.render("ourgame",{
        title:"Our Game"
    })
})
app.get("/registration", (req,res)=>{
    res.render("Registration",{
        title:"Registration"
    })
})
app.get("/login", (req,res)=>{
    res.render("Login",{
        title:"Login"
    })
})
app.post("/registration", async (req,res)=>{
    try {
      const password = req.body.password;
      const cpassword = req.body.cpassword;
      if(password === cpassword){
          const registerEmployee = new Register({
              firstname: req.body.firstname,
              lastname:req.body.lastname,
              email:req.body.email,
              phone:req.body.phone,
              password:password,
              cpassword:cpassword
          })

          const token = await registerEmployee.generateAuth();

          const registerSave = await registerEmployee.save();
          res.status(201).render("login",{
            title:"Login"
        });
      }else{
          res.send("password are not matching")
      }
    } catch (error) {
        res.status(400).send(error)        
    }
})
app.post("/login", async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
      
        const useremail = await Register.findOne({email:email});
       
        const isMatch =  await bcrypt.compare(password, useremail.password);

        if(isMatch){
            res.status(201).render("index",{
                title:"ZillaOnline"
            });
        } else{
            res.send("password not matching")
        }
    } catch (error) {
        res.status(400).send("Invalid Email");
    }
})

// const securePassword = async (password)=>{
//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);
//     const passwordmatch = await bcrypt.compare(password, passwordHash);
//     console.log(passwordmatch);
// }
// securePassword("123@gmal")


// jws token

// const jwt = require('jsonwebtoken');

// const createToken = async () =>{
//     const token = await jwt.sign({_id:"63bd95506c308b5b7074bfe1"},"mynamesimuhammadwaqarrajputiamfromshahkot");
//     console.log(token)

//     const userVer = await jwt.verify(token, "mynamesimuhammadwaqarrajputiamfromshahkot",{
//         expiresIn:"2 seconds"
//     });
//     console.log(userVer);
   
// }

// createToken();
app.listen(port, ()=>{
    console.log(`server listing on port number: ${port}`);
})
