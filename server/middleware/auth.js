import jwt from 'jsonwebtoken'
export const auth = async(req,res, next)=>{
    try {
   const token = req.headers.authorisation.split(" ")[1]
   const isCustomToken = token.length < 500
   let authenticatedData;
   if(token && isCustomToken){
       authenticatedData = await jwt.verify(token, process.env.SECRET)
       req.userId = authenticatedData?.id
   }else{
       authenticatedData = await jwt.decode(token)
       userId = authenticatedData?.sub
   }
       
   } catch (error) {
       console.log(error)
   }
  
   next()
}
export default auth