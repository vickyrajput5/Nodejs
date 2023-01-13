const mongoose =  require('mongoose');
const validater = require('validator')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const registerSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minlength:3
    },
    lastname:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true, "email already presendt"],
        validate(value){
            if(!validater.isEmail(value)){
                throw new Error('invalid Email')
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
// generate Token

registerSchema.methods.generateAuth = async function(){
  try {
    console.log(this._id);
    const token = await jwt.sign({_id:this._id}, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:token})  
    await this.save()
    console.log(token)
  } catch (error) {
      console.log(`this is error ${error}`)
  }  
}


// hash password
registerSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password =  await bcrypt.hash(this.password, 10);
        this.cpassword = await bcrypt.hash(this.password, 10);
    }
    next()
})

const Register = new mongoose.model("Register", registerSchema);

module.exports =  Register;