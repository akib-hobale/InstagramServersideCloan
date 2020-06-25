
const post = require('../models/post.models');
const ObjectId = require('mongodb').ObjectID;

async function createPost(req,res){
   
    const {title,body} = req.body
    
    if(!title || !body){
        res.status(422).json({error:"Please add all the fields"})
    }
    const Post = new post({
        title,
        body,
        postedBy:req.userData
    })

    const result = await Post.save();    
    res.json({post:result});
}

async function allPosts(req,res){
let result = await post.aggregate([{
                                        $lookup:{
                                            from:"users",
                                            localField:"postedBy",
                                            foreignField:"_id",
                                            as:"posts"
                                        }
                                    },{
                                        $project:{
                                            "posts.password":0,
                                            "postedBy":0
                                    }}]);
res.json({result});
}

async function myPosts(req,res){
    console.log(req.userData._id)
    let result = await post.aggregate([{$match:{
                                        postedBy:ObjectId(req.userData._id)
                                        }},{
                                            $lookup:{
                                                from:"users",
                                                localField:"postedBy",
                                                foreignField:"_id",
                                                as:"myPosts"
                                            }
                                        },{
                                            $project:{
                                                "myPosts.password":0,
                                                "postedBy":0
                                            }
                                        }]);

        res.json({result});

}

module.exports.createPost = createPost;
module.exports.allPosts = allPosts;
module.exports.myPosts = myPosts;