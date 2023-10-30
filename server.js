const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const app = express();
app.use(express.json());


//inport routes

const postRoutes = require('./routes/routes');

//app middleware
app.use(bodyParser.json()); 


app.use(postRoutes);

const PORT =8080;
const DB_URL = 


mongoose.connect(DB_URL)
.then(()=>{

    console.log('DB Connected')
})
.catch((err) => console.log('DB connection error',err));



app.listen(PORT,()=>{

    console.log(`App is running ${PORT}`);
});