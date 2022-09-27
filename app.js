const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

// pass: 'edinqmqllshvowss'

//cookies and sessions
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//encryption
const bcrypt = require('bcrypt');
// const { response } = require('express');
const saltRound = 10;

//my app
const app = express();
//database
const db = require('./models/databasemodels');//editted
const {User,ApplyLoan,Savings,DeclinedLoan} = require('./models/databasemodels');
// const {ApplyLoan} = require('./models'); //editted


//database.
const sequelize = require('./database/connection');///editted 
const { where } = require('sequelize');

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
//SETTING UP MAILER
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'standrewswomengroup@gmail.com',
    pass: 'edinqmqllshvowss'
    }
});

// const mailOptions = {
//     from: 'standrewswomengroup@gmail.com',
//     to: 'joaninamulwa@gmail.com',
//     subject: 'Corey Loves you babey!',
//     text: 'That was easy!'
//     };

// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
//     });


//REGISTER.
//form details to database
app.post('/signup', (req,res) =>{

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const phonenumber = req.body.phonenumber
    const IDnumber = req.body.IDnumber
    const password= req.body.password

console.log(req.body);
        bcrypt.hash(password,saltRound, (err, hash) =>{

    //mailer
    const mailOptions = {
            from: 'standrewswomengroup@gmail.com',
            to: `${email}`,
            subject: 'Registration!',
            text: `Iam ${firstname}  ${lastname} my number is ${phonenumber} and my ID number is ${IDnumber}, welcome to andrews sait group`
            };

            User.create({
                firstname:firstname,
                lastname:lastname,
                email:email,
                phonenumber:phonenumber,
                IDnumber:IDnumber,
                password:hash
            }).then(success =>{
                res.send({message:"Registration successful!"});

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
                });

            }).catch(err =>{
                res.send({message:"A user with the details already exists!"});
                console.log(err);
            });
        });

    })

    

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

User.findAll({
    include:ApplyLoan,
    where:{phonenumber: phonenumber}}).then((result) =>{
        if(result.length >0){
            bcrypt.compare(password, result[0].password,(error, response) =>{
                if(response){
                    req.session.user = result;
                    console.log(result);
                    res.send(result);
                }else{
            res.send({message: "Credentials do not match"});
                }
            })
        }else{
            res.send({message: "User doesn't exist"});
        }
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
    const  userid= req.body.useridentity

    //global Variables.


    User.findAll(
        {where:
            {phonenumber: phonenumber}
        }
        ).then(result =>{

            console.log("********************");
            console.log(result);
            const emailo = result[0].email;
            console.log(emailo);
            console.log("********************");        
            

console.log(req.body);

     //mailer
    const mailOptions = {
        from: 'standrewswomengroup@gmail.com',
        to: `${emailo}`,
        subject: 'Loan Application!',
        text: `Dear ${firstName}  
    Your loan application of ${amount} has been received!
    Your guarantors are ${g1firstName} ${g2firstName} `
        };
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
        g2phonenumber:g2phoneNumber,
        UserUserId:userid
    }).then(success =>{

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
            res.send({message:"Application ya loan iko fiti"});
    }).catch(err =>{
        console.log(err);
        // res.send(err);
        res.send({message: "You already applied for a loan"});
    });
}).catch(err =>{
    console.log(err);
})
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








//MEMBERS ROUTE.
    
app.post('/members', (req,res) =>{
    User.findAll().then(result =>{
        console.log(result);
        res.send(result);
    }).catch(err =>{
        console.log(err);
    });
})












sequelize.sync().then(req =>{//editted

    app.listen(3001,()=>{
        console.log('Server running on port 3001');
    });
});