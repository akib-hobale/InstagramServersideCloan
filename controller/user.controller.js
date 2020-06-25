const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtKey} = require('../config/dev.config');


/* 
   @Param: name
   @Param: email
   @Param: password
*/
async function signUp(req,res){
const {name,email,password} = req.body;
if(!name || !email || !password){
   return res.status(422).json({error:"Please add all the fields"})
}

let result = await User.findOne({email:email});
if(result){
   return res.status(422).json({error:"user already exists with that email"})
}

let hash = await  bcrypt.hash(password,12);

const user = new User({
   email,
   name,
   password:hash
})

let saveUser = user.save();
   if(saveUser){
      return res.status(200).json({message:"successfuly posted"})
   }
  
}

async function signIn(req,res){
   const {email,password}= req.body;
   if(!email || !password){
      return res.status(422).json({error:"Please add email or password"})
   }

   let result = await User.findOne({email:email});
   if(!result){
      return res.status(422).json({error:"Invalid Email or password"});
   }

   let passwordCompair = await bcrypt.compare(password,result.password);
   if(!passwordCompair){
      return res.status(422).json({error:"Password is Wrong Please check"});
   } else {
      const token = jwt.sign({_id:result._id,email:email},jwtKey)
      return res.status(200).json({data:token,message:"Successfully signed in"})
   }

}

async function protect(req,res){
   res.send("hello user");
}

module.exports.signIn = signIn;
module.exports.signUp = signUp;  
module.exports.protect = protect;