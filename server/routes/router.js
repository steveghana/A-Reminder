import express from 'express'
import {getPost, createPost, updatePost, likeCount, deletepost} from "../controllers/ServerCrud.js"
import auth from '../middleware/auth.js'
 const router = express.Router()
router.get("/", getPost)
router.post("/",auth, createPost)
router.patch("/:id",auth, updatePost)
router.patch("/:id/likecount", auth, likeCount)
router.delete('/:id', auth, deletepost)
export default router;
