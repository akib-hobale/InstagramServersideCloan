
module.exports = (req,res,next) =>{
    const error = new Error('Route not Match');
    error.status = 404;
    next(error);
}