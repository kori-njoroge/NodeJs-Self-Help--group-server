const express = require('express');
const cors = require('cors');

//cookies and sessions
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//encryption
const bcrypt = require('bcrypt');
const { response } = require('express');
const saltRound = 10;

//my app
const app = express();
//database
const db = require('./models');
const {User} = require('./models');
const {ApplyLoan} = require('./models');


app.use(express.json());
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods :["GET","POST"],
        credentials: true
    }
));

//applying middleware
// app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session(
    {
        key: "userId",
        secret:"AmTheSecretWhatDidYouExpect",
        resave: false,
        saveUninitialized:false,
        cookie:{
            expires:60 * 60 * 6,//expiry time for the cookie
        }
    }
))


//REGISTER.
//form details to database
app.post('/signup', (req,res) =>{

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const phonenumber = req.body.phonenumber
    const IDnumber = req.body.IDnumber
    const password= req.body.password
// console.log(req.body);
    bcrypt.hash(password,saltRound, (err, hash) =>{

        User.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            phonenumber:phonenumber,
            IDnumber:IDnumber,
            password:hash
        }).catch(err =>{
            console.log(err);
        });



    });
    res.send("Inserted")
});

app.get('/signin', (req,res) =>{
    if(req.session.user){
        res.send({loggedIn: true},{user:req.session.user})
    }else{
        res.send({loggedIn: false});
    }
});

//LOGIN
//login details from database
app.post('/signin', (req,res) =>{

    const phonenumber = req.body.phonenumber;
    const password= req.body.password;

User.findAll({where:{phonenumber: phonenumber}}).then((result) =>{
        if(result.length >0){
            bcrypt.compare(password, result[0].password,(error, response) =>{
                if(response){
                    req.session.user = result;
                    // console.log(req.session.user);
                    res.send(result);
                }else{
            res.send({message: "Credentials do not match"});
                }
            })
        }else{
            res.send({message: "User doesn't exist"});
        }
        // console.log(result);
    })
});

//LOANS DATABASE.
app.post('/applyloan', (req,res) =>{

    const  firstName = req.body.firstName
    const  lastName = req.body.lastName
    const  IDnumber =req.body.IDnumber
    const  phonenumber = req.body.phonenumber
    const  amount = req.body.amount
    const  duration = req.body.duration
    const  purpose = req.body.purpose
    const  g1firstName =  req.body.g1firstName
    const  g1lastName = req.body.g1lastName 
    const  g1IDnumber = req.body.g1IDnumber
    const  g1phoneNumber = req.body.g1phoneNumber
    const  g2firstName= req.body.g2firstName
    const  g2lastName =req.body.g2lastName
    const  g2IDnumber= req.body.g2IDnumber
    const  g2phoneNumber =req.body.g2phoneNumber
console.log(req.body);
    ApplyLoan.create({
        firstname:firstName,
        lastname:lastName,
        IDnumber:IDnumber,
        phonenumber:phonenumber,
        amount:amount,
        duration:duration,
        purpose:purpose,
        g1firstname:g1firstName,
        g1lastname:g1lastName,
        g1IDnumber:g1IDnumber,
        g1phonenumber:g1phoneNumber,
        g2firstname:g2firstName,
        g2lastname:g2lastName,
        g2IDnumber:g2IDnumber,
        g2phonenumber:g2phoneNumber
    }).catch(err =>{
        console.log(err);
    });
    res.send("application successful");
})


//LOAN DETAILS ENQUERY.
app.post('/dashboard/summary', (req,res) =>{
    const currentUser = req.body.UserPhoneNumber;
    console.log(req.body.UserPhoneNumber);
    ApplyLoan.findAll(
        {where:
            {phonenumber: currentUser}
        }
        ).then((response) =>{
            // console.log(response);
            res.send(response);
        }).catch(err =>{
            console.log(err);
        })
})






















db.sequelize.sync().then(req =>{

    app.listen(3001,()=>{
        console.log('Server running on port 3001');
    });
});