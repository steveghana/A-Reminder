import * as constants from '../constants/index'
export const post = (allposts = [], action) =>{
switch (action.type) {
    case constants.FETCH:
return  action.payload    
    case constants.POST:
return  [...allposts, action.payload] 
case constants.UPDATE:
case constants.LIKED:
    return allposts.map((post)=> post._id === action.payload._id ? action.payload : post) 
case constants.DELETE:
    return allposts.filter(post=>post._id !== action.payload._id)
    default:
return allposts
}
}