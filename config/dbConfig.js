const mongoose = require('mongoose')
require('dotenv').config()
const url = process.env.DATABASE
mongoose.connect(url)
.then(()=> {
    console.log('Database connected succeddfully')
})
.catch((e) => {
    console.log(e.message);
})