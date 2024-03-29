const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const crypto = require("crypto");
const { sendMail } = require('../helper/mail');
const { Token } = require('../model/tokenModel');


const secretKey= process.env.SECRET;

const register = async(req,res) =>{
    let {firstName, lastName, email, confPassword, password} = req.body;
    const salt = await bcrypt.genSalt();
    if (password !== confPassword){
        res.status(400).send({
            data: {},
            message: "Password and Confirm password should match",
            status: 1,
        });
    }else{
       bcrypt.hash(password, salt, async (err, hash)=>{
        if (err){
            res.status(400).send({
                data:{},
                message: err,
                status: 1
            });
        }else{
            const existingUser = await User.findOne({
                email:email
            });
            if (existingUser){
                return res.status(400).json({
                    data: {},
                    message: "Email alresdy exists",
                    status: 1,
                });
            }
            let user = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
                confPassword: hash,
            });
            user.save((err, user) =>{
                if (err){
                    res.status(500).send({
                        data: {},
                        message: `An error occured during registration: ${err}`,
                        status: 1,
                    });
                }else{
                    res.status(201).send({
                        data: user,
                        message: "User registered successfully",
                        status: 0,
                      });
                }
            })
        }
       });
    }
};

const login = async (req, res)=>{
    const {email, password} = req.body;
    User.findOne({
        email: email
    }, async(err, user)=>{
        if (err){
            res.status(500).send({
                data: {},
                message: err,
                status: 1,
            });
        }else if (!user){
            res.status(401).send({
                data: {},
                message: `User with ${email} not found!`,
                status: 1,
            });
        }else{
            bcrypt.compare(password, user.password, (err, result)=>{
                if (err) {
                    res.status(500).send({ 
                        data: {},
                        message: err,
                        status: 1,
                    });
                  }else if (!result){
                    res.status(401).send({
                      data: {},
                      message: "Email or password is incorrect",
                      status: 1,
                    });
                }else{
                    const token = jwt.sign({
                        id : user._id,
                    }, secretKey,{
                        expiresIn: "1h",
                    });
                    res.status(200).send({
                        data:{
                            id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                        },
                        message: "User logged in",
                        token: token,
                        status:0,
                    });
                }
            })
        }
    });
}

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authenication token, authorization denied" });
  
    const verfied = jwt.verify(token, process.env.SECRET);
    if (!verfied)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
  
    req.user = verfied.id;
    next();
  };
  
const tokenIsValid = async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.SECRET);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).send({ data: {}, error: err.message, status: 1 });
    }
  };

const requestPasswordReset = async (req,res)=>{
    let {email} = req.body;
  
    const user = await User.findOne({email});
    if(!user){
      res.status(401).send({
        data: {},
        message: `User with ${email} not found!`,
        status: 1,
      });
    }
  
    let token = await Token.findOne({
      userId: user._id
    });
    if(token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex");
  
    const hash = await bcrypt.hash(resetToken, Number(10));
  
    await new Token({
      userId: user.id,
      token: hash,
      createdAt: Date.now(),
    }).save();
  
    const link = `localhost://${PORT}/passwordReset?token=${resetToken}&id=${user._id}`;
    sendMail(user.email, "Password Reset Request", {name: user.firstName, link:link,}, "../helpers/template/requestResetPassword.handlebars");
    res.status(200).send({
      data: {
        token: token,
        userId:user._id,
        link: link,
  
      },
      message: "Reset Password Successful",
      status: 0,
    });
  };
  
const resetPassword = async(req, res)=>{
    let {userId, token, password} = req.body;
    let passwordResetToken = await Token.findOne({userId});
  
    if (!passwordResetToken){
      throw new Error("Invalid or Expired password reset token")
    }
  
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (isValid){
      throw new Error("Invalid or Expired password reset token")
    }
  
    const hash = await bcrypt.hash(password, Number(10));
    await User.updateOne(
      {_id: userId},
   {password: hash},
    );
  
    const user = await User.findById({
      _id: userId
    });
  
    sendMail(user.email, "Password Reset Successfully", {name: user.firstName},  "../helpers/template/resetPassword.handlebars");
    await passwordResetToken.deleteOne();
    res.status(200).send({
      data: {
        _id: userId,
        password: hash,
      },
      message: "Password Reset successfully",
      status: 0,
    });
  }

module.exports={
    register,
    login,
    auth,
    tokenIsValid,
    requestPasswordReset,
    resetPassword,
}
