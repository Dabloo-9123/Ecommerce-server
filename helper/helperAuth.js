const bcrypt=require('bcrypt')


 const hashPassword=async (password)=>{
     try{
         const saltround=10;
         const hashedPassword=await bcrypt.hash(password,saltround)
         return hashedPassword;
     }
     catch(err){
        console.log("err found in hashing password");
     }
}

 const ComparePassword= (password,hashedPassword)=>{
return bcrypt.compare(password,hashedPassword)
}
module.exports={ComparePassword,hashPassword}