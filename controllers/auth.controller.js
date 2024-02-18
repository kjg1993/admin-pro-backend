const { response } = require('express');
const bcrypt = require("bcryptjs");

const User = require('../models/user'); 
const { generateJwt } = require('../helpers/jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });
        //verify email
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email or Password are not valid.'
            })
        }

        //verify password 
        const validPassword = bcrypt.compareSync( password, userDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'The password is wrong.'
            });
        }

        //Generate the TOKEN = JWT
        const token = await generateJwt(userDB.id);



        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please reach out the System Admin.'
        });
    }

}

module.exports = {
    login
}