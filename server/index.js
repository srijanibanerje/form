import express from "express";
import mysql from "mysql";
import cors from "cors";

const app= express();
app.use(cors());
app.use(express.json());

//connection with mysql server
const connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"login_db"
})
connection.connect(function(err){
    if(err){
        console.log("Error connecting");
    }else{
        console.log("Connected with database");
    }
})
//insert data from register form
app.post('/register',(req,res)=>{
    const sql="INSERT INTO user(`email_id`,`username`,`password`,`role`) VALUES(?)";
    const values=[
        req.body.email,
       req.body.username,
       req.body.password,
       req.body.DropdownValue     
    ]
   connection.query(sql,[values],(err,result) =>{
       if(err) return res.json("error happend");
       console.log(result);
       return res.json(result);
   });       
   });  
//login 
   app.post('/login',(req, res)=>{
    const sql="SELECT * FROM user WHERE email_id= ? AND password = ?"; 
    connection.query(sql,[req.body.email,req.body.password],(err,result)=>{
       if(err) return res.json({Status:"Error in Server"});
    //    console.log(result);
    //    return res.json(result);
       if(result.length >0){
        return res.json({Status:"sucess",sucess:"login sucessfully"});
       }else{
           return res.json({Status:"error",error:"Wrong Email or Password"});
       }
    })
   })
   //welcome page
   app.get('/welcomepage/:email', (req,res)=>{
   
    console.log(req);
    const sql="SELECT * FROM user WHERE email_id = ?";
    connection.query(sql,[req.params.email],(err,data)=>{
        if(err) return res.json("error")
        return res.json(data);
        
    })
       
    })

//port number
app.listen(8081,()=>{
    console.log("server listening on port 8081");
})