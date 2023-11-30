
const arr=[];
const bcrypt=require('bcrypt')
const register=(req,res)=>{
    const data = req.body;
    const details=arr.find((item)=>{
        if(item.email===data.email){
           return item
        }
    })
    if(details){
        res.send("User already Exist")
    }
    else{
        const saltround=10;
        const randomValue=bcrypt.genSaltSync(saltround);
        const hashPassword=bcrypt.hashSync(data.password,saltround)
        console.log(hashPassword);
        const tempobj={
            email:data.email,
            password:hashPassword,
            name:data.name,
            phone:data.phone
        }
        arr.push(tempobj);
        res.send(tempobj)
    }
   
    // res.send(hashPassword)
console.log(arr);
}



const login=(req,res)=>{
    const login_data=req.body;

    const details=arr.find((item)=>{
        if(item.email===login_data.email)
        {
            return item;
        }
    })

    if(details){
        const validate=bcrypt.compareSync(login_data.password,details.password)
        if(validate)
        {
            return res.send("Login Succesful")
        }
        else{
            res.send("Password is wrong")
        }
    }
    else{
        res.send("Email  is wrong")
    }
  
    
}
module.exports={register,login}