import mongoose from 'mongoose'
const PostSchema = mongoose.Schema({
    creator : String,
    title : String,
    message : String,
    tags : [String],
    selectedFile : String,
    createdAt :{
        type : Date,
        default : new Date()
    },
    likes :{
        type : [String],
        default :  []
    }
})

const postMessage = mongoose.model('postMessage', PostSchema)
export default postMessage;