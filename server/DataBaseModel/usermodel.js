import mongoose from 'mongoose'
const userSchema = mongoose.Schema({
firstName:{
    type: String,
    requierd : true,
},
secondName :{
    type: String,
    requierd : true,
    
},

email:{
    type : String,
   requierd: true,
},
 password :{
      type: String,
      requierd : true,
 },
 confirmpassword :{
      type: String,
     
 }
})
const user = mongoose.model("User", userSchema)
export default user
