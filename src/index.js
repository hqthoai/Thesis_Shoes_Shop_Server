require('dotenv').config();
require('./configs/db/connect');
const express = require ('express');
const morgan = require('morgan');
const cors = require('cors')
const route = require('./routes');

const app = express();

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
