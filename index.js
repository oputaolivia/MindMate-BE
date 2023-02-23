const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');
const { userRoute } = require('./routes/userRoutes');
const { botRoute } = require('./routes/botRoutes');



const app = express();
dotenv.config();
connectDB();

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/user", userRoute);
app.use("/bot", botRoute);

app.listen(PORT, ()=>{
    console.log(`Mind Mate running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})