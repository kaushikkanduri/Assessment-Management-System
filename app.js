const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const dbConnect = require("./config/connection");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.port || 8000;
const path = require("path");
const cookieParser = require("cookie-parser");
app = express();

dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views')); 

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/templates/home.html"));
});

app.use('/api',require("./Routes/userRoute"));
app.use('/api',require("./Routes/reportRoute"));

app.use(errorHandler);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
