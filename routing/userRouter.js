const collectdata = require('../controller/productController');
const { register, login } = require('../controller/userController');

const userRouter=require('express').Router();


userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.gets('/data',collectdata)
module.exports={userRouter}



