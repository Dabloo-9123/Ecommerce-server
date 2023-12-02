const {MongoClient}=require('mongodb');

const mongourl="mongodb://127.0.0.1:27017";
const cloudurl='mongodb+srv://Dabloo1234:Dabloo1234@todo-mern.ym01v6s.mongodb.net/?retryWrites=true&w=majority'
const mongoserver= new MongoClient(mongourl);
const connection=async()=>{
try{
    await mongoserver.connect();
    console.log("connection succesful");
}
catch(err){
console.log("error occured in connection",err);
}
}

const database=mongoserver.db("Company")

module.exports={connection,database};