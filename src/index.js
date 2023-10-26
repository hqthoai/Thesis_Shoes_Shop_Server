require('dotenv').config();
const express = require ('express');
const route = require('./routes');
require('./config/db/connect');

const app = express();

const port = process.env.PORT || 3001;

// middleware: sử dụng để xử lý các yêu cầu gửi từ client dưới dạng URL-encoded.
app.use(express.urlencoded({extended: true}));
// middleware: sử dụng để xử lý các yêu cầu gửi từ client dưới dạng JSON.
app.use(express.json());

route(app);

app.listen(port, ()=> {
    console.log(`Sever is running at http://localhost:${port}`);
})


