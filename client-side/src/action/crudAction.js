import * as api from '../api/clientCrud.js'
import * as constants from '../constants/index'

export const getPostFromServer = () => async (dispatch)=>{
    try {
        const {data} = await api.fetchPost()
        dispatch({type : constants.FETCH, payload : data})
    } catch (error) {
        console.log(error.message);
    }
}

export const createPostToServer = (post) => async (dispatch)=>{
    try {
        const {data} = await api.createPost(post)
        dispatch({type : constants.POST, payload : data})
    } catch (error) {
        console.log(error);
    }
}

export const updatedPost = (id, post)=> async (dispatch) =>{
try {
    const {data} = await api.updatePost(id, post)
    dispatch({type : constants.UPDATE, payload: data})
       
} catch (error) {
console.log(error);    
}
}

export const likedCount = (id) => async (dispatch)=>{
    try {
        const {data} = await api.likedPost(id)
   
        dispatch({type:constants.LIKED, payload : data})
    } catch (error) {
        console.log(error);
    }
}
export const deletedPost= (id)=>async (dispatch)=>{
try {
    const {data} = await api.deletepost(id)
    dispatch({type : constants.DELETE, payload : data})
} catch (error) {
    console.log(error)
}
}
