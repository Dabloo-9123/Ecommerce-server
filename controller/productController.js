const data=require('../data')


const collectdata=(req,res)=>{
    res.send(data)
}
const SearchProduct=(async (req,res)=>{
    console.log(req.body);
    let data= await data.find(
        {
            "$or":[
                {"name":{$regex:req.body}},
               
                {"branch":{$regex:req.body}}
            ]
        }
    )
    res.send(data)
    // console.log(data);
})
module.exports=collectdata;

