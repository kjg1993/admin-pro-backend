const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJwt } = require("../helpers/jwt");

//route users

//get users function 

const getUsers = async (req, res = response) => {
  const users = await User.find({}, "name email role google");

  res.json({
    ok: true,
    users,
    uid: req.uid
  });
};

//
//create users function
//
const createUsers = async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailAlreadyExist = await User.findOne({ email });

    if (emailAlreadyExist) {
      return res.status(400).json({
        ok: false,
        msg: "The email is already registered!",
      });
    }

    const user = new User(req.body);

    //Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    
    //Save user
    await user.save();

    //Generate the TOKEN = JWT
    const token = await generateJwt( user.id );


    res.json({
      ok: true,
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected Error, please ckeck the logs.",
    });
  }
};

//Update user function
//

const updateUser = async (req, res = response) => {
  //TODO: validate token if is the right user
  const uid = req.params.id;

  try {
    const userDb = await User.findById(uid);

    if (!userDb) {
      return res.status(404).json({
        ok: false,
        msg: "That user ID it does not exist!",
      });
    }

    //Updates
    const { password, google, email, ...fields } = req.body;

    if (userDb.email !== email) {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({
          ok: false,
          msg: "It is already exist an user with that email.",
        });
      }
    }

    fields.email = email;

    const userupdateds = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    res.json({
      ok: true,
      user: userupdateds,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

//
// Delete user function
//

const deleteUser = async (req, res = response) => { 

  const uid = req.params.id;

  try {
    const userDb = await User.findById(uid);

    if (!userDb) {
      return res.status(404).json({
        ok: false,
        msg: "That user ID it does not exist!",
      });
    }

    await User.findByIdAndDelete( uid );

    // If userDb is found, you can send back the uid
    res.json({
      ok: true,
      msg: 'User deleted successfully!'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      uid: uid
    });
  }
};



module.exports = {
  getUsers,
  createUsers,
  updateUser,
  deleteUser,
};
