const express=require('express')
const cors=require('cors')
const { userRouter } = require('./routing/userRouter');
const {connection, connectDb} = require('./confiq/db');
const dotenv =require('dotenv')

// dot env config
dotenv.config()


// Database Configuration
connectDb()


const app = express();
app.use(cors())
// const bodyParser=require('body-parser');
app.use(express.json())
app.use('/api',userRouter)
// app.get('/',(req,res)=>{
//     res.send('Home Page')
// })

app.listen(443,async()=>{
    try{
        console.log("Server is running at port number 443");
    }
    catch(err){
        console.log(err,"error during starting the  server");
    }
})


// *********************************************************************************
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// // Middleware to parse JSON
// app.use(bodyParser.json());

// // Placeholder data for users (in-memory storage, not suitable for production)
// const users = [
//   { username: 'user1', password: 'password1' },
//   { username: 'user2', password: 'password2' }
// ];

// // Signup endpoint
// app.post('/signup', (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Missing username or password' });
//   }

//   // Check if the username is already taken
//   if (users.some(user => user.username === username)) {
//     return res.status(400).json({ error: 'Username already exists' });
//   }

//   // Store the new user (in-memory, not suitable for production)
//   users.push({ username, password });

//   res.status(201).json({ message: 'Signup successful' });
// });

// // Login endpoint
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Missing username or password' });
//   }

//   // Check if the user exists and the password is correct
//   const user = users.find(u => u.username === username && u.password === password);

//   if (user) {
//     return res.json({ message: 'Login successful' });
//   } else {
//     return res.status(401).json({ error: 'Invalid username or password' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });