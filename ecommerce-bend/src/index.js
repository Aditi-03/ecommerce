const express= require ('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose= require('mongoose');

const authRoutes = require('./routes/auth');

env.config();
 //mongodb connection
 //mongodb+srv://root:<qazwsxedc>@cluster0.wklx1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
 mongoose.connect(
     `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.wklx1.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
      {
          useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex:true
        }
        ).then(()=>{
            console.log('Database connected');
        });

app.use(express.json());
// app.get('/',(req,res,next)=>{
// res.status(200).json({
//     message: 'Hello from server'
// });
// });

// app.post('/data',(req,res,next)=>{
//     res.status(200).json({
//         message: req.body
//     });
//     });

app.use('/api',authRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});