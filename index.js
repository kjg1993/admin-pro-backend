require('dotenv').config();
const express = require('express');

const cors = require('cors');


const { dbConnection } =  require('./database/config');



// Creating express server 
const app = express();

//configure cors
app.use(cors());

dbConnection();

//console.log( process.env);

// settings routes
app.get('/', (rep, res) => {

    res.json({
        ok: true,
        msg: "Hola Kevin"
    })
});

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT );
}); 

//User: kguzman077
//Password: z3VQa1lV3chydQw9

//string: mongodb+srv://kguzman077:z3VQa1lV3chydQw9@cluster0.bfco4ko.mongodb.net/hospitalDB