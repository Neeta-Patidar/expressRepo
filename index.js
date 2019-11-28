var express=require("express");
var config=require("config");
var stduent=require("./route/student");
var app=express();

var port=parseInt(config.get("port"));


app.use(function(req,res,next)
        {
     res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
        }
);
app.use("/student",stduent);
app.listen(port,()=>{
    console.log("server started...");
});
