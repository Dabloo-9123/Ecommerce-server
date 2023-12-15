const mongoose=require('mongoose')


const connectDb=async ()=>{
    try{
            const conn= await mongoose.connect(process.env.URI)
            console.log("connection succesful");
    }
    catch(err){
            console.log("Error while connecting",err);
    }
}

module.exports={connectDb}