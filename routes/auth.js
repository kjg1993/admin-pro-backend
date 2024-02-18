/* 
    Path: /api/login
*/

const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { check } = require('express-validator');

const router = Router();

router.post('/', 
[
 check('email', 'The email is mandatory').isEmail(),
 check('password', 'The password is mandatory').not().isEmpty(),
 validateFields
],
 login
)


module.exports = router;
