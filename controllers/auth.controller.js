const authModule = require('../models/auth.model');
const validationResult = require('express-validator').validationResult;
const confirmEmail = require('../confirmation/confirm');

const jwt = require('jsonwebtoken');

exports.postSignUp = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        authModule.createNewUser(req.body.username, req.body.email, req.body.password).then(()=>{
            res.status(201).json({
                "message": "user created"
            });
            confirmEmail.sendMailTo(req.body.email);
        }).catch((err)=> {
            res.status(500).json({
                "error": err
            });
        });
    } else {
        res.status(400).json({
            "validationErrors": validationResult(req).array()
        });
    }
};

exports.postLogin = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        authModule.login(req.body.email, req.body.password).then((id)=>{
            const token = jwt.sign({
                'email': req.body.email,
            }, process.env.JWT_KEY, {
                expiresIn: "1h"
            });
            res.status(200).json({
                "message": 'successful login',
                'token': token
            });
        }).catch((err)=> {
            res.status(500).json({
                'error': err
            })
        });
    } else {
        res.status(400).json({
            'error': validationResult(req).array(),
        })
    }
};