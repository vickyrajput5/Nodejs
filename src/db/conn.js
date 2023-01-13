const mongoose = require('mongoose');

mongoose.connect(process.env.Local_Host).then(()=>{
    console.log("Connection is Seccussfull")
}).catch(()=>{
    console.log("No Connection");
})

console.log(process.env.Local_Host);