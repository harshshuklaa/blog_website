const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")

const IndexRoute = require("./Routers/index")
const connectDatabase = require("./Helpers/database/connectDatabase")
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler")

dotenv.config({
    path:'config/config.env'
})

connectDatabase()

const app = express() ;

app.use(express.json())
app.use(cors())

app.use("/",IndexRoute)

app.use(customErrorHandler)

const PORT = process.env.PORT || 5000 ;

app.use(express.static(path.join(__dirname , "public") ))





const __dirname1=path.resolve();
if(process.env.NODE_ENV === 'production'){
app.use(express.static(path.join(__dirname1,"/frontend/build")));

app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname1,"/frontend/build"));
});
}else{
    app.get("/", (req, res) => {
        res.send("api running");
    });
}

const server = app.listen(PORT,()=>{

    console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`)

})

process.on("unhandledRejection",(err , promise) =>{
    console.log(`Logged Error : ${err}`)

    server.close(()=>process.exit(1))
})