const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/usersData';
const bcrypt = require('bcrypt');

const userSchema = {
    username: String,
    email: String,
    password: String,
};
let User = mongoose.model('user', userSchema);

exports.createNewUser = (username, email, password) => {
    const emailF = email.toLowerCase();
    return new Promise((resolve, reject)=> {
        mongoose.connect(DB_URL).then(()=>{
            return User.findOne({email: emailF});
        }).then((user)=> {
            if(user) {
                mongoose.disconnect();
                reject('This email is exist');
            } else {
                return bcrypt.hash(password, 10);
            }
        }).then((hashedPassword)=> {
            let user = new User({
                username: username,
                email: emailF,
                password: hashedPassword
            });
            return user.save();
        }).then(()=> {
            mongoose.disconnect();
            resolve('');
        }).catch((err)=> {
            mongoose.disconnect();
            reject(err)
        });
    });
};

exports.login = (email, password)=> {
    const emailF = email.toLowerCase();
    return new Promise((resolve, reject) => {
        // connect to database
        mongoose.connect(DB_URL).then(()=> {
            return User.findOne({email: emailF});
        }).then((user)=> {
            if(!user) {
                mongoose.disconnect();
                reject('Email is not valid');
            } else {
                bcrypt.compare(password, user.password).then((same)=> {
                    if(!same) {
                        mongoose.disconnect();
                        reject('wrong password');
                    } else {
                        mongoose.disconnect();
                        resolve(user._id);
                    }
                });
            }
        }).catch((err)=> {
            mongoose.disconnect();
            reject(err);
        })
    });
};