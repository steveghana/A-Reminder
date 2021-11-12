import { LOGOUT, AUTH } from '../constants'
import * as api from '../api/clientCrud'
export const signin = (formData, history, errorhandle)=>async(dispatch)=>{
    console.log(formData)

    try {
        const {data} = await api.signIn(formData)
        const {err} = data
        if(err) {
            errorhandle(err)
        }else{
            dispatch({type : AUTH, payload : data})
            
            history.push("/")
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
}
export const signup = (formData, history, errhandle)=> async(dispatch)=>{
    try {
        const {data} = await api.signUp(formData)
        const {err} = data
        if(err) {
            errhandle(err)
        }else{
            dispatch({type : AUTH, payload : data})
            localStorage.setItem('profile',JSON.stringify({...data}))
            history.push("/")
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const logout =()=> async(dispatch)=>{
    try {
        
        dispatch({type: LOGOUT})
} catch (error) {
    console.log(error)
}
}