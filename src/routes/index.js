const productRouter = require('./product');
const userRouter = require('./user');
const categoryRouter = require('./category');
const brandRouter = require('./brand');
const authRouter = require('./auth');
function route(app) {
    app.use('/api/auths', authRouter)
    app.use('/api/products', productRouter);
    app.use('/api/users', userRouter);
    app.use('/api/categories', categoryRouter);
    app.use('/api/brands', brandRouter);
    app.use('/api/orders', categoryRouter);
    app.use('/*', (req,res)=> {
        res.status(404).json('Not Found Endpoint!!')
    })
}

module.exports = route;
