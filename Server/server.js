const express= require("express");
const mongoose=require('mongoose');
const cors = require('cors') ;


const app= express();

app.use(express.json()) ;
app.use(cors({
    origin : '*'
}))

/*Connection to databAse*/
mongoose.connect('mongodb://localhost:27017/TestDB', {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log(`connection to database established`);
}).catch(err=>{
    console.log(`db error ${err.message}`);
});

const OrderSchema = new mongoose.Schema({
    Item:String
});
const Order = mongoose.model("Order",OrderSchema);


/*Create UserSchema*/
const UserSchema= new mongoose.Schema({
    name:String,
    items:[OrderSchema],
    address:String,
    pin:Number
});

const User = mongoose.model("User",UserSchema) ;
/*Fetch data all the Users*/ 
app.get("/",(req, res)=>{
User.find({}, (err, result)=>{
    if(!err){
        if(result){
            res.json(result)
        }else{
            console.log('No user found');
            res.json(result)
        }
    }else{
        console.log(`Error:${err.message}`);
    }
    
})
});

app.post('/UserAdded',async(req, res)=>{
    var name= req.query.name;
    // console.log('name',Newname);
    var Newitem=req.query.item;
    var address=req.query.address;
    var pin =req.query.pincode;

    const NewUser= new User({
       name,
        address, 
        pin,
        
    });
    NewUser.save();


    // res.json(NewUser);

    const NewOrder = ({
        Item:Newitem
    });
    // NewOrder.save();
    
    const foundName=await User.findOne({name:name})
      if(foundName){
           foundName.items.push(NewOrder); 
           console.log('inside->',foundName)
           foundName.save();
           res.json(foundName)
      }else{
          console.log('FoundName Not exist')
      }
    console.log('data' ,foundName)
    




    // User.find({name:name})
    // .then((docs)=>{
    //     console.log('name-->', docs);
    //     res.json(docs);
    // }).catch(err=>{
    //     console.log(`error :->${err.message}`);
    // })


})




//Port Listen
app.listen(8080,(err)=>{
    
    if(!err){
        console.log("Server successfully Started");
    }else{
        console.log("Server goes Down");
    }
})