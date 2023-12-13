const collectdata = require('../controller/productController');
const { register, login, checkout } = require('../controller/userController');

const userRouter=require('express').Router();


userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/data',collectdata)
userRouter.post('/checkout',checkout)
module.exports={userRouter}



