const mongoose = require('mongoose');

module.exports = () =>{
    mongoose.connect("mongodb://localhost:27017/test"
                    ,{
                        useNewUrlParser:true
                        ,useUnifiedTopology:true
                    }).then(()=> console.log('database connected Succefuly'))
                    . catch((err)=> console.log('Database connection fail issue',err));
}