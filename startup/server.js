const port = 5000;


module.exports = app =>{
    app.listen(port,()=>{
        console.log('Server is connected to port',port);
    })
}