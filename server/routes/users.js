import express from "express";
const userrouter = express.Router()
import {signIn, signUp} from '../controllers/users.js'
userrouter.post("/signin", signIn)
userrouter.post("/signup", signUp)
export default userrouter