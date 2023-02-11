const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const route = require('./routes/todoRoute');
const auth = require('./routes/auth')
const app = express();


if (process.env.NODE_ENV !== 'production') {

    dotenv.config();
}

app.use(express.json());
app.use(cors({
    credentials:true,
    methods:["GET", "HEAD","PUT","DELETE"],
}));
app.use(cookieParser());

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(console.log("connected to mongodb"))
    .catch((err) => console.log(err))

app.use('/api/auth', auth);
app.use('/api/todos', route);

app.listen(port, console.log(`listening on port ${port}`));