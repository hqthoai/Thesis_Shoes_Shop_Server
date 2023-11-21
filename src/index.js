require('dotenv').config();
const express = require ('express');
require('./configs/db/connect');
const cors = require('cors')
const app = express();
const route = require('./routes');
const morgan = require('morgan');

const port = process.env.PORT || 3001;

app.use(morgan('combined'));
// middleware: sử dụng để xử lý các yêu cầu gửi từ client dưới dạng URL-encoded.
app.use(express.urlencoded({limit: '10mb', extended: true}));
// middleware: sử dụng để xử lý các yêu cầu gửi từ client dưới dạng JSON.
app.use(express.json({ limit: '10mb' }));

app.use(cors());
route(app);

app.listen(port, ()=> {
    console.log(`Sever is running at http://localhost:${port}`);
})
