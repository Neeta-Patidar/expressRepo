var express=require("express");
var mysql=require("mysql");
var joi=require("joi");
var config=require("config");
var connection=mysql.createConnection({
    host:config.get("host"),
    database:config.get("database"),
    user:config.get("user"),
    password:config.get("password")
});
var router=express();
router.use(express.json());
connection.connect();
router.get("/",(request,response)=>{
        var queryText="select * from student";
       connection.query(queryText,(err,result)=>{
           if(err==null)
           {
               response.send(JSON.stringify(result));
           }
           else{
               response.send(JSON.stringify(err));
           }
       }); 
});
router.get("/:no",(request,response)=>{
    var no=request.params.no;
    var queryText=`select * from student where no=${no}`;
   connection.query(queryText,(err,result)=>{
       if(err==null)
       {
           response.send(JSON.stringify(result));
       }
       else{
           response.send(JSON.stringify(err));
       }
   });
});
router.put("/:no",(request,response)=>{
    var no=request.params.no;
    var name=request.body.name;
    var address=request.body.address;
    var queryText=`update student set name='${name}',address='${address}' where no=${no}`;
   connection.query(queryText,(err,result)=>{
       if(err==null)
       {
           response.send(JSON.stringify(result));
       }
       else{
           response.send(JSON.stringify(err));
       }
   });
});
router.delete("/:no",(request,response)=>{
    var no=request.params.no;
    var queryText=`delete from student where no=${no}`;
   connection.query(queryText,(err,result)=>{
       if(err==null)
       {
           response.send(JSON.stringify(result));
       }
       else{
           response.send(JSON.stringify(err));
       }
   });
});

router.post("/",(request,response)=>{
    var valaditionRes=validation(request);
    if(valaditionRes.error==null)
    {
    var no=request.body.no;
    var name=request.body.name;
    var address=request.body.address;
    var queryText=`insert into student values(${no},'${name}','${address}')`;
   connection.query(queryText,(err,result)=>{
       if(err==null)
       {
           response.send(JSON.stringify(result));
       }
       else{
           response.send(JSON.stringify(err));
       }
   }); 
   }
     else{
         response.send(JSON.stringify(valaditionRes.error));
     }
});

function validation(request)
{
    var validationschme={
        no:joi.number().required(),
        name:joi.string().required(),
        address:joi.string().required()
    };
    return joi.validate(request.body,validationschme);
}
module.exports=router;
