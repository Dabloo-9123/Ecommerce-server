const { hashPassword, ComparePassword } = require('../helper/helperAuth');
const userModel = require('../model/userModel');
const jwt=require('jsonwebtoken')

const stripe=require('stripe')("sk_test_51OMl3QSJ2bUiRJKATb3c20e8kAmBY1aH7wYn1HDjVM6cC2I2NabYMdzi0Hpzk4WCtCUnuMxf2FRntC3wphfmx1FP00rIaqMniq")
const arr=[];




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
        res.send("Signup Succesful")
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
// const login= async (req,res)=>{
// try{
//      const{email,password}=req.body
//     //  validation
//     if(!email || !password){
//         return res.status(404).send({
//             success:false,
//             msg:"Invalid email or password"
//         })
//     }
//     const user= await userModel.findOne({email})
//     if(!user){
//         return res.status(404).send({
//             success:false,
//             msg:"Email is not registerd"
//         })
//     }
//     const match= await ComparePassword(password,user.password)

//     if(!match){
//         return res.status(200).send({
//             success:false,
//             msg:"Invalid Password"
//         })
//     }
//     const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

//     res.status(200).send({
//         success:true,
//         msg:"Login Succesfully",
//         user:{
//             name:user.name,
//             email:user.email,
//             phone:user.phone
//         },
//         token,
//     })
// }
// catch(err){
//     console.log(err);
//     res.status(500).send({
//         success:false,
//         msg:"Error in Login",
//         err
//     })
// }
// }

// const register= async(req,res)=>{
// try{
//     const{name,email,password,phone}=req.body
//     // validation

//     if(!name){
//         return res.send({error:"name is Required"})
//     }
//     if(!email){
//         return res.send({error:"Email is Required"})
//     }
//     if(!password){
//         return res.send({error:"Password is Required"})
//     }
//     if(!phone){
//         return res.send({error:"Mobile Number is Required"})
//     }
    
//     // checking user
//     const existingUser= await userModel.findOne({email})
     
//     if(existingUser){
//         return res.status(200).send({
//             success:true,
//             message:"Already registered Please Login"
//         })
//     }
//     const hashedPassword= await hashPassword(password)

//     const user=await new userModel({name,email,password:hashedPassword,phone})
//     user.save()
//   res.status(200).send({
//     success:true,
//     msg:"Registered Succesfully",
//     user
//   })
// }
// catch(err){
//     console.log("errror while registering",err);    
// }
// }


// payment gateway
const checkout= async (req,res)=>{
const {products}=req.body;
console.log(products)
const lineItems=products.map((product)=>({
   
    price_data:{
        currency:"inr",
        product_data:{
            name:product.name
        },
        unit_amount:product.price*100,
    },
    quantity:product.quantity
}));
const session= await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineItems,
    mode:"payment",
    success_url:"https://master--symphonious-zabaione-dcd655.netlify.app/sucess",
    cancel_url:"http://localhost:3000/cancel"
})
res.json({id:session.id})
}
module.exports={register,login,checkout}