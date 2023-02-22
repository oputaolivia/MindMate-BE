const User = require("../model/userModel");

const getUser = async (req,res)=>{
    try{
        let {id} = req.params;
        const user = await User.findById(id);

        res.status(200).send({
            data:{
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
            message: "User details found",
            status: 0,
        });
    }catch (err){
        res.status(500).send({
            data: {},
            message: err,
            status: 1,
        });
    }
};

const getUsers = async ( req, res)=>{
    try{
        const users = await User.find({});
        res.status(200).send({
            data: users,
            message: " All Users details",
            status: 0,
        })
    }catch (err){
        res.status(500).send({
            data: {},
            message: err,
            status: 1,
        });
    }
}

module.exports = {
    getUser,
    getUsers,
}