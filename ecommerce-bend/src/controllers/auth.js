const User= require('../models/user');
const jwt  = require('jsonwebtoken');
const bcrypt=  require('bcrypt');

exports.signup = (req,res)=>{
    User.findOne({ email: req.body.email})
    .exec(async (error,user)=>{
        if(user) return res.status(400).json({
            message: 'User already registered'
        });
    

/*here */
        const {
            firstName,
            lastName,
            email,
            password
        }=req.body;
        const hash_password = await bcrypt.hash(password, 10);  
        // console.log( hash_password);
        const _user=new User({
            firstName,
            lastName,
            email,
            hash_password,
            //password,
            username: Math.random().toString()     
           });
           _user.save((error,data)=>{
               if(error)
               {
                   return res.status(400).json({
                       message: 'something went wrong'
                       
                   });
               }
               if(data){
                   return res.status(201).json({
                      // user:data
                      message: 'user created successfully'
                   })
               }
           });
    });
}

exports.signin= (req,res)=>{
    User.findOne({ email: req.body.email})
    .exec((error,user)=>{
        if(error) return res.status(400).json({error});
        if(user) 
        {
            if(user.authenticate(req.body.password))
            {
                const token = jwt.sign({_id: user._id},process.env.JWT_SECRET, { expiresIn: '1h' } );
                const { _id,firstName, lastName, email, role, fullName }= user;
                res.status(200).json
                ({
                    token,
                    user: { _id,firstName,lastName,email,role,fullName

                    }
                });
            }
            else{
                res.status(400).json({
                    message: 'Invalid Password'
                })
            }
        }
        

        
        else
        {
            return  res.status(400).json({message : 'something went wrong'});
        }
    
    });

}

// exports.requireSignin = (req,res,next)=>{
//     jwt.decode()
// } 