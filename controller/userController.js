const stripe=require('stripe')("sk_test_51OMl3QSJ2bUiRJKATb3c20e8kAmBY1aH7wYn1HDjVM6cC2I2NabYMdzi0Hpzk4WCtCUnuMxf2FRntC3wphfmx1FP00rIaqMniq")
const arr=[];
const bcrypt=require('bcrypt');
const {database}=require('../confiq/db')
const usercollection=database.collection("userDetails")

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
    success_url:"http://localhost:3000/sucess",
    cancel_url:"http://localhost:3000/cancel"
})
res.json({id:session.id})
}
module.exports={register,login,checkout}