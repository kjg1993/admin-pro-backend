require('dotenv').config();
const express = require('express');

const cors = require('cors');


const { dbConnection } =  require('./database/config');



// Creating express server 
const app = express();

//configure cors
app.use(cors());

//Body parse and lecture 
app.use( express.json());

dbConnection();

//console.log( process.env);

// settings routes.
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT );
}); 



//User: kguzman077
//Password: z3VQa1lV3chydQw9
//string: mongodb+srv://kguzman077:z3VQa1lV3chydQw9@cluster0.bfco4ko.mongodb.net/hospitalDB


//new password: qPomThOVJYpfMGhw
//new user: kjg1993
//mongodb+srv://kjg1993:qPomThOVJYpfMGhw@cluster0.bfco4ko.mongodb.net/HospitalDb
