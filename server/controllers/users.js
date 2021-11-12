import user from "../DataBaseModel/usermodel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const signIn = async(req, res)=>{
    const {email, password} =req.body
  
    try {
        const existinuser = await user.findOne({email})
        
        // console.log(existinuser.password)
        if (!existinuser) return res.json({err : 'User doesnt exist'})
        const isPassword = await bcrypt.compare(password, existinuser.password)
        if(!isPassword) res.json({err : 'Invalid credentials'})
        const hashedPassword = await bcrypt.hash(password, 12)
        
        const token = await jwt.sign({email, password : hashedPassword, id: existinuser._id}, process.env.SECRET, {expiresIn : '1hr'})
        res.status(200).json({result : existinuser, token})
    } catch (error) {
        console.log(error)
        res.status(500).json('something went wrong')
    }
}

export const signUp = async(req, res)=>{
    const {firstName, secondName, password, confirmpassword, email} = req.body
    // console.log(req.body)
//    res.send('hihi')
try {
     
             const existinuser = await user.findOne({email})
            //  const existinuser = await user.deleteMany({email})
            
             if(existinuser) return res.json({err:'User already exist'})
             if(password !== confirmpassword) return res.json( {err: 'Password dont match'})
             
             const hashedPassword = await bcrypt.hash(password, 12)
             const newUser =await user.create({email, password : hashedPassword, firstName, secondName })
             const token = await jwt.sign({email : newUser.email, id: newUser}, process.env.SECRET, {expiresIn : '1hr'})
             res.status(200).json({result : newUser, token})
            //  console.log(existinuser)
        
    } catch (error) {
        res.status(404).json('something went wrong')
        console.log(error)
    }
        
    }