var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/UserCredDB2', {useNewUrlParser: true,useUnifiedTopology: true})
// HERE UserCredDB IS THE DATABASE NAME 
var conn = mongoose.Collection;

var userSchema = mongoose.Schema({  //DECLARING THE SCHEMA OF THE COLLECTION 
    name:{
        type:String,
        require:true,
        // index:{
        //     unique:true,
        // }
    },
    email:String,
    id:Number,
    FullTime:Boolean,
    data:{
        type:Date,
        default:Date.now
    }
});

var userModel = mongoose.model("UserDataCollection",userSchema)//here UserData`Collection is the collection name in UserCredDB database
module.exports=userModel; //exporting the userModel variable so that it is accessible in other files as well 

