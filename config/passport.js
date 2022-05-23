const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;

//Load User Model
const User = require('../models/user');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        //match User
        User.findOne({email: email})
        .then(user => {
            if (!user){
                return (null, false, { message: 'Email not registered' });
            }

            //match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;

                if (isMatch){
                    return (null, user)
                } else {
                    return (null, false, {message: 'password incorrect'})
                }
            })
        })
        .catch (err => console.log(err));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById, (err, user) => {
            done(err, user);
        }
    }) 
}