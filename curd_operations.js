var express = require("express")
var userModel = require("./database")
var app = express()
app.use(express.json())

// var vv = require('./rahees')

// app.get("/api/fffindAll",vv.find_all1)

function chekEmail(req,res, next)
{
    `This is a middleware which will check email id if the email id dont have @ syombl
    then payload will not be stored in the database
    `
var email = req.body.email
var email_validation = email.indexOf("@")
if(email_validation >=0)
{
    // console.log("Congrates you have valid email id")
    next()
}
else
{
console.log("You don't have @ inside ur email id")
res.send("You don't have a vaild email id Please check again..")
}
}

function checkUsernameMiddleware(req,res,next)   //MIDDLEWARE 4 CHECKUSERNAME IN DATABASE
{
    `This is a middleware which will check if user name sent in the payload 
    already exists in the database.
    If same user name exists in the database then payload will not stored in the database
    `
  var username = req.body.name;
  console.log("username from postman == "+username)
  var userExistCheck = userModel.findOne({name:username})
  userExistCheck.exec((err,data)=>{
    if(err) throw err;
    if(data)
    {
        console.log("value of data ==== "+data)
    res.send(username+" already exists in the database can't insert same user again")
    }
    else
    {
    var userName = req.body.name
    var email = req.body.email
    var FullTime = req.body.FullTime
    var id = req.body.id

var UserDetail = new userModel({
    name:userName,
    email:email,
    id:id,
    FullTime:FullTime
})
UserDetail.save(function(err,data)
{
    if(err) throw error;
})
next()
    }
  })
}

app.get("/find_One/:id",function(req,res){

    var id = req.params.id
    var fetechedUserDetails = userModel.findOne({id:id})
    fetechedUserDetails.exec((err,data)=>{
        if(err) throw error;
        res.send("data of the user with id "+id+" is rendered below\n"+data)
    })
})

app.get("/getAll", function (req,res){
    var getAllUsers = userModel.find({})
    getAllUsers.exec((err,data)=>{
        if(err) throw err;
        res.send("The data of all the users is given below\n"+data)
    })
})

app.post("/upload_ur_data",chekEmail, checkUsernameMiddleware,function (req,res){
    console.log("inside the post API")
    res.send("Data uploaded successfully in the Database")
})

// HTTP PUT METHOD IS USED TO UPDATE THE DATA BUT WE HAVE TO PASS THE ENTIRE PAYLOAD HENCE PUT USES MORE BANDWIDTH
app.put("/update/:id", function (req,res)
{
    var id = req.params.id
    updated_data = {name:req.body.name,
        email:req.body.email,
        FullTime:req.body.FullTime,
        id:req.body.id
    }
    var updateduserData = userModel.findOneAndUpdate({id:id},{$set:updated_data})
    updateduserData.exec((err,data)=>{
        if(err) throw err;
        res.send("data is updated using HTTP PUT METHOD successffully in the database Good Luck")
    })


})


//HTTP PATCH METHOD IS USED TO PARTIALLY UPDATE THE INFORMATION HENCE IT USES LESS BANDWIDTH  
app.patch('/partialUpdate/:id', function (req, res,next) 
{
    var id = req.params.id;

    var partiallyUpdateduserData = userModel.findOneAndUpdate({id:id},{$set:{FullTime: req.body.FullTime}})
    partiallyUpdateduserData.exec((err,data)=>{
        if (err) throw err;
        res.send("data is Partially updated using HTTP PATCH METHOD successffully in the database Good Luck")
    })

})

app.delete("/del", function (req,res){
    var name = req.body.name
    var delUser =  userModel.deleteOne({name:name})
    delUser.exec((err,data)=>{
        if(err) throw err;
        res.send(name+ "data deleted successfully !!!!")
    })
})


app.listen(3333,()=>{console.log("Rahees ur server is running on 3333 port number")})