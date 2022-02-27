const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const bodyParser = require('body-parser');
const check = require('express-validator').check;



router.post('/signup', bodyParser.json(), check('username').not().isEmpty().withMessage('username is required'),
check('email').not().isEmpty().withMessage('E-mail is required').isEmail().withMessage('invalid format'),
check('password').isLength({min: 6}).withMessage('Use 6 characters or more for your password'),
check('confirmPassword').custom((value, {req }) => value === req.body.password).withMessage('Those passwords didn’t match. Try again.'),
authController.postSignUp);

router.post('/login', bodyParser.json(), check('email').not().isEmpty().withMessage('E-mail is required').isEmail().withMessage('invalid format'),
check('password').not().isEmpty().withMessage('password is required').isLength({min: 6}).withMessage('password must be at least of 6 characters')
,authController.postLogin);

module.exports = router;