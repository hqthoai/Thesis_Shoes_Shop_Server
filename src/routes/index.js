const productRouter = require('./product');
const userRouter = require('./user');
const categoryRouter = require('./category');
const brandRouter = require('./brand');
const authRouter = require('./auth');
function route(app) {
    app.use('/api/auth', authRouter)
    app.use('/api/product', productRouter);
    app.use('/api/user', userRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/brand', brandRouter);
    app.use('/api/order', categoryRouter);
    app.use('/', (req,res)=> {res.send("home");})
}

module.exports = route;
