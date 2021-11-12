import axios from 'axios'

const API = axios.create({baseURL : 'http://localhost:5000'})
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
req.headers.authorisation =`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
        
    }
    return req
})
export const fetchPost =()=> API.get("/posts")
export const createPost = (post) => API.post("/posts", post)
export const updatePost = (id, post) => API.patch(`/posts"/${id}`, post)
export const likedPost = (id) => API.patch(`/posts/${id}/likecount`)
export const deletepost = (id)=> API.delete(`/posts"/${id}`)
export const signIn = (formData) => API.post("/user/signin", formData)
export const signUp = (formData) => API.post(`/user/signup`, formData)