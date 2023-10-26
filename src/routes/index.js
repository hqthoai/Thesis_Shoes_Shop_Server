const productRouter = require('./product');
const userRouter = require('./user');
const categoryRouter = require('./category');

function route(app) {
    app.use('/api/product', productRouter);
    app.use('/api/user', userRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/order', categoryRouter);
    app.use('/', (req,res)=> {res.send("home");})
}

module.exports = route;
