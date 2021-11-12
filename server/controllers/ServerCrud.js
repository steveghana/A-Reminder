import postMessage from "../DataBaseModel/model.js"
import mongoose from 'mongoose'
export const getPost = async (req, res)=>{
try {
    const message = await postMessage.find()
res.status(200).json(message)
} catch (error) {
    console.log(error.message);
}
}

export const createPost = async (req, res)=>{
    const post = req.body
    try {
        const newmessage = new postMessage(post)
      await  newmessage.save()
      res.status(201).json(newmessage)
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = async (req, res) => {
    const {id : _id} = req.params
    const post = req.body
    try {
if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No id match found")    
const updatedPost = await postMessage.findByIdAndUpdate(_id, post, {new : true})
res.json(updatedPost)
    } catch (error) {
        console.log(error);
    }

}

export const likeCount = async(req, res)=>{
const {id} = req.params

try {
    if(!req.userId) return res.status(404).send('Unauthenticated')
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No id match found")
    const post = await postMessage.findById(id)
    
    const postindex = post.likes.findIndex((id)=> id === String(req.userId))
  
    if(postindex === -1){
        post.likes.push(req.userId)
    }else{
        post.likes.filter((id)=> id !== String(req.userId))
        // post.likes = []
    }
   
    const likedPost = await postMessage.findByIdAndUpdate(id,post, {new : true})
    res.json(likedPost)
    
} catch (error) {
console.log(error)    
}


}

export const deletepost =async (req, res)=>{
    const {id} = req.params
    console.log(req.userId)
    try {
        if(!req.userId) return res.status(404).send('Unauthenticated')
        const deletedpost = await postMessage.findByIdAndDelete(id)
        res.status(200).json(deletedpost)
    } catch (error) {
        console.log(error)
    }
}