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
            error: err.message,
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
  
const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user;
  
      if (id !== userId)
        return res
          .status(401)
          .send({ data: {}, message: "Unauthorized!", status: 1 });
  
      const user = await User.findOne({
        _id: id,
      });
  
      const updatedUser = await User.findByIdAndUpdate(id, req.body);
  
      res
        .status(201)
        .send({ data: updatedUser, message: "User Updated", status: 0 });
    } catch (err) {
      res.status(500).send({ data: {}, error: `${err.message}`, status: 1 });
    }
  };
  
  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user;
  
      if (id !== userId)
        return res
          .status(401)
          .send({ data: {}, message: "Unauthorized!", status: 1 });
  
      const user = await User.findOne({
        _id: id,
      });
      if (!user)
        return res.status(401).send({
          data: {},
          message: "User does not exist!",
          status: 1,
        });
  
      const deletedUser = await User.findByIdAndRemove(id);
      res.status(201).send({ message: "User Deleted", status: 0 });
    } catch (err) {
      res.status(500).send({ data: {}, error: `${err.message}`, status: 1 });
    }
  };
module.exports = {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
}