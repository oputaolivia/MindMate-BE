const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch (err){
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;