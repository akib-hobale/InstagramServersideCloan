
const error = require('../middleware/error');
const userRoute = require('../routes/user.route');
const postRoute = require('../routes/post.route');
const rootNotFound = require('../routes/routeNotMatch');
const morgan = require('morgan');

module.exports = (app,express) =>{
    app.use(express.json());
    app.use('/uploads', express.static('uploads'));
    app.use(express.urlencoded({extended:false}));
    app.use(morgan('dev'));


    app.use('/user',userRoute);

    app.use('/post',postRoute);

    app.use(rootNotFound);

    app.use(error);
}