const { isEmpty } = require('../libs/checkLib');
const responseLib = require('../libs/responseLib');
const mongoose = require('mongoose');
const userModel = mongoose.model('User');
const encLib = require('../libs/encLib');
const tokenLib = require('../libs/tokenLib');

module.exports = {
    login : async (req, res) => {
        try {
            let findUser = await userModel.find({email : req.body.email}).lean();
            if(isEmpty(findUser)){
                throw new Error('No account found with this email');
            }
            if(encLib.decrypt(findUser[0].password) !== req.body.password){
                throw new Error('Invalid Password');
            }
            let  payload = {
                name : findUser[0].name,
                email : findUser[0].email,
                mobile : findUser[0].mobile
            }
            payload.token = await tokenLib.generateToken(payload);
            let apiResponse = responseLib.generate(false, `Login Successful`, payload);
            res.status(200);
            res.send(apiResponse)
        } catch (error) {
            let apiResponse = responseLib.generate(true, `${error.message}`, null);
            res.status(400);
            res.send(apiResponse);
        }
    },
    register : async (req, res) => {
        try {
            let findUser = await userModel.find({email : req.body.email}).lean();
            if(!isEmpty(findUser)){
                throw new Error('Your Email is Already Registered');
            }
            let user = new userModel({
                name : req.body.name,
                email : req.body.email,
                mobile : req.body.mobile,
                password : encLib.encrypt(req.body.password)
            });
            await user.save();
            delete user.password;
            let apiResponse = responseLib.generate(false, `Registration Successsful... Login to Continue`, user);
            res.status(200);
            res.send(apiResponse);
        } catch (error) {
            let apiResponse = responseLib.generate(true, `${error.message}`, null);
            res.status(400);
            res.send(apiResponse);
        }
    },
    dashboardView : ()=> {

    },

    
}