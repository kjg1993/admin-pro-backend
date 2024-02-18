/*
Route: /api/users
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { getUsers, createUsers, updateUser, deleteUser} = require('../controllers/users.controller');
const { validateJwt } = require('../middlewares/validate-jwt');
 
const router = Router();

router.get('/',validateJwt, getUsers);

router.post(
    '/',
    [
     check('name', 'The name is mandatory field').not().isEmpty(),
     check('password', 'The password is a mandatory field').not().isEmpty(),
     check('email', 'The email is a mandatory field').isEmail(),
     validateFields
    ],
    createUsers);

router.put('/:id', 
   [
    validateJwt,
    check('name', 'The name is mandatory field').not().isEmpty(),
    check('email', 'The email is a mandatory field').isEmail(),
    check('role', 'The role is a mandatory').not().isEmpty(),
    validateFields
   ],

   updateUser);

router.delete('/:id', 
   [
    // check('name', 'The name is mandatory field').not().isEmpty(),
    // check('email', 'The email is a mandatory field').isEmail(),
    // check('role', 'The role is a mandatory').isEmail(),
    validateJwt,
    validateFields
   ],

   deleteUser);

module.exports = router;