const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

////MPESA CONFIG
const authorization ='Bearer xPGvGlO1GuhuFILYZAUCFIAPlEw5'
const password = "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjIxMjAxMTgzMzE1"
const timestamp =  "20221201183315"



///MPESA
// const Mpesa = require ('mpesa-api').Mpesa;
// const mpesa = new Mpesa(credentials, environment);

// const credentials = {
//     clientKey: 'bDPNJtdBmdwLy5SwGGyMOSvdp8ADRp3e',
//     clientSecret: 'SMVF5geqzkbc7sdv',
//     initiatorPassword: 'Safaricom999!*!',
//     securityCredential: 'YOUR_SECURITY_CREDENTIAL',
//     certificatePath: 'keys/example.cert'
// };

///END OF MPESA

///Another mpesa
// let unirest = require('unirest');

// let req = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')

// .headers({

//     'Content-Type': 'application/json',

//     'Authorization': 'Bearer A4Ru2pm6G6hAxq40bM0bT9e5GacC'

// })

// .send(JSON.stringify({

//     "BusinessShortCode": 174379,

//     "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjIxMDA0MDMxNjE0",

//     "Timestamp": "20221004031614",

//     "TransactionType": "CustomerPayBillOnline",

//     "Amount": 400,

//     "PartyA": 254706306415,

//     "PartyB": 174379,

//     "PhoneNumber": 254706306415,

//     "CallBackURL": "https://mydomain.com/path",

//     "AccountReference": "CompanyXLTD",

//     "TransactionDesc": "Payment of X" 

//   }))

// .end(res => {

//     if (res.error) throw new Error(res.error);

//     console.log(res.raw_body);

// });

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
const {User,ApplyLoan,Savings,DeclinedLoan,Notify} = require('./models/databasemodels');
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
        SameSite:"None",
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
//     subject: 'it meeeee!',
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
    const status ='Active'

console.log(req.body);
        bcrypt.hash(password,saltRound, (err, hash) =>{

    //mailer
    const mailOptions = {
            from: 'standrewswomengroup@gmail.com',
            to: `${email}`,
            subject: 'Registration!',
            text: `Hello,${firstname}  ${lastname} 
            Your Registration was successful,
            welcome to St Andrews Group
            Thank you `
            };

            User.create({
                firstname:firstname,
                lastname:lastname,
                email:email,
                phonenumber:phonenumber,
                IDnumber:IDnumber,
                password:hash,
                accountStatus:status
            }).then(success =>{
                User.findAll({
                    where:{
                        phonenumber:phonenumber
                    }
                }).then(user =>{
                    res.send([{message:"Registration successful!"},{"user":user}]);
                })

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


    app.post('/register',(req,res) =>{
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const phonenumber = req.body.phonenumber
        const amount = req.body.amount
        const purpose = req.body.purpose
        const userid = req.body.userid
        const phone= req.body.phonepay
        const company = "St Andrews Women Group"

        console.log(req.body)
        if(phonenumber){
            ///Another mpesa
            let unirest = require('unirest');
            let req = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
            .headers({
                'Content-Type': 'application/json',
                'Authorization': authorization
            })
        
            .send(JSON.stringify({
                "BusinessShortCode": 174379,
                "Password": password,
                "Timestamp": timestamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": phone,
                "PartyB": 174379,
                "PhoneNumber": phone,
                "CallBackURL": "https://mydomain.com/path",
                "AccountReference": company,
                "TransactionDesc": company 
            }))
            // res.send("Transaction")
        
        .end(respo => {
        
            if(respo.error){
                // throw new Error(res.error)
                console.log(respo.error);
                res.send("We could not process your payment at the moment!")
            }else{
                Savings.create({
                    firstname:firstname,
                    lastname:lastname,
                    phonenumber:phonenumber,
                    savingsamount:amount,
                    purpose:purpose,
                    UserUserId:userid
                })
                res.send("Transaction Successful!")
            }
        
        });
            }


    })
    
    


app.get('/', (req,res) =>{
    res.send("Corey's server is up!")
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
    const purpose = 'Registration Fee'

User.findAll({
    include:ApplyLoan,
    where:{phonenumber: phonenumber}}).then((result) =>{
        if(result.length >0){
            bcrypt.compare(password, result[0].password,(error, response) =>{
                if(response){
                    req.session.user = result;
                    console.log(result);
                    // res.send(result);
                    Savings.findAll({
                        where:{
                            phonenumber:phonenumber,
                            purpose:purpose,
                        },
                        attributes: [[sequelize.fn('sum', sequelize.col('savingsamount')),'total']]
                    }).then(resut =>{
                        res.send([{"result":result},{"resut":resut}]);
                    })
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
    // const  g1IDnumber = req.body.g1IDnumber
    const  g1phoneNumber = req.body.g1phoneNumber
    const  g2firstName= req.body.g2firstName
    const  g2lastName =req.body.g2lastName
    // const  g2IDnumber= req.body.g2IDnumber
    const  g2phoneNumber =req.body.g2phoneNumber
    const  userid= req.body.useridentity
    const  interest= req.body.interest

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
        You will be notified on approval
        Thank you`
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
        g1phonenumber:g1phoneNumber,
        g2firstname:g2firstName,
        g2lastname:g2lastName,
        loanStatus:"Pending Approval",
        g2phonenumber:g2phoneNumber,
        UserUserId:userid,
        interest:interest
    }).then(success =>{

        //sending the mail
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
            res.send({message:"Loan Application Successful!"});
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
    const savesaver = "Monthly Contribution"
    const loanPayer = "Loan Service fee"
    console.log(req.body.UserPhoneNumber);
    ApplyLoan.findAll(
        {
        where:
            {phonenumber: currentUser}
        }
        ).then((response) =>{
            console.log(response);
            Savings.findAll({where:{
                phonenumber:currentUser,
                purpose: savesaver
            }}).then(saver =>{
                console.log(saver);
                Savings.findAll({where:{
                    phonenumber:currentUser,
                    purpose:loanPayer
                },
                attributes: [[sequelize.fn('sum', sequelize.col('savingsamount')),'total']]
            }).then(loanPayerer =>{
                    Savings.findAll({
                        where:{
                    phonenumber:currentUser,
                    purpose:savesaver
                    // UserUserId:7
                        },
                        attributes: [[sequelize.fn('sum', sequelize.col('savingsamount')),'total']]
                    }).then(resu =>{
                        res.send([{loaner:response},{saver:saver},{loanPayer:loanPayerer},{'total':resu}]);
                    })
                })
            })
        }).catch(err =>{
            console.log(err);
        })
    })


    app.get("/mine",(req,res) =>{
        Savings.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('savingsamount')),'total']]
        }).then(total =>{
            Savings.findAll({
                where:{
                    UserUserId:7
                },
                attributes: [[sequelize.fn('sum', sequelize.col('savingsamount')),'total']]
            }).then(resu =>{
                res.send([{'total': total},{'becky':resu}])
            })
            // res.send(total);
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

//MyY LOANS ROUTES
app.post('/myloans',(req,res) =>{
    console.log("hello",req.body.userId)
    const userID = req.body.userId
    ApplyLoan.findAll({
        where:{
            UserUserId:userID
        }
    }).then(loanee =>{
        console.log("loanee",loanee);   
        res.send(loanee)
    }).catch(err =>{
        res.send({message:"No loan applied by the User"})
    })
})


///ADMIN PAGES
app.post('/admin/adminMembers', (req,res) =>{
    User.findAll().then(users =>{
        // console.log(users);
        ApplyLoan.findAll({where:{
            loanStatus:"Pending Approval"
        }}).then(loans =>{
            // console.log(loans);
            res.send([{"User":users},{"Loans":loans}]);
            //will add savings one day
        })
        
    })
})

///more details route
app.post('/admin/adminmembers/moredetails',(req,res) =>{
    const userid = req.body.userid
    const savesaver = "Monthly Contribution";
    console.log(userid)
    Savings.findAll({
        where:{
            UserUserId:userid,
            purpose:savesaver
        }
    }).then(savingsrec =>{
        console.log(savingsrec);
        ApplyLoan.findAll({
            where:{
                UserUserId:userid
            }
        }).then(loanRec =>{
            console.log(loanRec);
            User.findAll({
                where:{
                    UserId:userid
                }
            }).then(userfound =>{
                Savings.findAll({
                    where:{
                        UserUserId:userid,
                        purpose:savesaver
                    },
                    attributes: [[sequelize.fn('sum', sequelize.col('savingsamount')),'total']]
                }).then(total =>{
                    res.send([{User:userfound},{Savings:savingsrec},{loans:loanRec},{'total':total}]);
                    console.log(userfound)
                })
            })
        })
    })
})

app.post('/moredetails/deactivate', (req,res) =>{
    const userid = req.body.userId
    console.log("food",userid);
    User.update(
        {accountStatus:'Deactivated'},
        {where:{
            userId:userid
        }}
    ).then(response =>{
        console.log(response)
    }).catch(err =>{
        console.log(err)
    })
})


// app.get('/admin/adminMembers', (req, res) =>{
//     if(req){
//         // console.log(req.body)
//     }else{
//         // console.log("Nothing to show");
//     }
//     const selectedUserId = 5;
//     // console.log(selectedUserId);
//     ApplyLoan.findAll({where:{
//         UserUserId:selectedUserId
//     }}).then(loanee =>{
//         if(loanee){
//             console.log(loanee);
//             res.send(loanee);
//         }else{
//             res.send("No member matches the user Id");
//         }
//     }).catch(err =>{
//         // res.send(err);
//     })
// }
// )







//MY WALLET ROUTE
app.post('/mywallet',(req,res) =>{
    const userid= req.body.userId;
    const savesaver = "Monthly Contribution";
    const loanPayer = "Loan Service fee"
    console.log(userid)
    Savings.findAll({
        where:{
            UserUserId:userid,
            purpose: savesaver
        },
        // attributes: [[sequelize.fn('sum', sequelize.col('savingsamount')),'total']]
    }).then(response =>{
        Savings.findAll({
            where:{
                UserUserId:userid,
                purpose: savesaver
            },
            attributes: [[sequelize.fn('sum', sequelize.col('savingsamount')),'total']]
    }).then(result =>{
        Savings.findAll({
            where:{
                UserUserId:userid,
                purpose: loanPayer
            },
            attributes: [[sequelize.fn('sum', sequelize.col('savingsamount')),'total']]
        }).then(reply =>{
            Savings.findAll({
                where:{
                    UserUserId:userid,
                    purpose: loanPayer
                }
            }).then(loaner =>{
                res.send([{'total':result},{'saver':response},{'loantotal':reply},{'loanPayer':loaner}])
            })
        })
    })
})
})






//MPESA
app.post('/mywallet/mpesa' ,(req,res) =>{
    console.log(req.body);
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const phonenumber = req.body.phonenumber
    const amount = req.body.amount
    const purpose = req.body.purpose
    const userid = req.body.userid
    const phone= req.body.phonepay
    const company = "St Andrews Women Group"

    console.log(phonenumber)
    console.log(amount)
    console.log(purpose)
    console.log(firstname)
    if(phonenumber){
    ///Another mpesa
    let unirest = require('unirest');
    let req = unirest('POST', 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest')
    .headers({
        'Content-Type': 'application/json',
        'Authorization': authorization
    })

    .send(JSON.stringify({
        "BusinessShortCode": 174379,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": 174379,
        "PhoneNumber": phone,
        "CallBackURL": "https://mydomain.com/path",
        "AccountReference": company,
        "TransactionDesc": company 
    }))
    // res.send("Transaction")

.end(respo => {

    // if (res.error) throw new Error(res.error);

    // console.log(res.raw_body);
    if(respo.error){
        // throw new Error(res.error)
        console.log(respo.error);
        res.send("We could not process your payment at the moment!")
    }else{
        Savings.create({
            firstname:firstname,
            lastname:lastname,
            phonenumber:phonenumber,
            savingsamount:amount,
            purpose:purpose,
            UserUserId:userid
        })
        res.send("Transaction Successful!")
    }

});
    }
})

// ADMIN SAVINGS ROUTE
app.post('/adminsavings', (req,res) =>{
    Savings.findAll({where:{
        purpose:"Monthly Contribution"
    }}).then(savers =>{
        // console.log(savers);
        Savings.findAll({where:{
            purpose:"Monthly Contribution"
        },
        attributes: [[sequelize.fn('sum', sequelize.col('savingsamount')),'total']]
    }).then(total =>{
            res.send([{'savers':savers},{"total":total}]);
        })
    })
})

app.post('/approvedloans', (req,res) =>{
    ApplyLoan.findAll({where:{
        loanStatus:"Approved"
    }}).then(reslt =>{
        ApplyLoan.findAll({
            where:{
                loanStatus:"Disbursed"
            }
        }).then(response =>{
            res.send([{"reslt":reslt},{"disbursed":response}]);
        })
    })
})



app.post('/admin/appliedloans/evaluation', (req,res) =>{
    // Boo!
    // Yaay!
    const idloan = req.body.loanid
    console.log(req.body)
    if(req.body.status === "Yaay!"){
        console.log("maahn")
        ApplyLoan.update(
            {loanStatus:"Approved"},
            {where:{loanId:idloan}}
        )
    }else if(req.body.status === "Boo!"){
        console.log("Kuwa serious")
        ApplyLoan.update(
            {loanStatus:"Rejected"},
            {where:{loanId:idloan}}
        )
    }
})


app.post('/admin/groupaccounts', (req,res) =>{
    const savesaver = "Monthly Contribution"
    const loanPayer = "Loan Service fee"
    const registration = "Registration Fee"
    const status = "Disbursed"

    Savings.findAll({
        where:{
            purpose:savesaver
        },
        attributes: [[sequelize.fn('sum', sequelize.col('savingsamount')),'total']]
    }).then(reply =>{
        Savings.findAll({
            where:{
                purpose:loanPayer
            },
            attributes: [[sequelize.fn('sum', sequelize.col('savingsamount')),'total']]
        }).then(result =>{
            ApplyLoan.findAll({
                where:{
                    loanStatus:status
                },
                attributes: [[sequelize.fn('sum', sequelize.col('amount')),'total']]
            }).then(loan =>{
                Savings.findAll({
                    where:{
                        purpose:registration
                    },
                    attributes: [[sequelize.fn('sum', sequelize.col('savingsamount')),'total']]
                }).then(register =>{
                    res.send([{"TotalSavings":reply},{"loanIssued":loan},{"LoanPaid":result},{"regAccount":register}]);
                })
            }).then(err =>{
                console.log(err)
            })
        }).then(err =>{
            // res.send(err)
        })
    })
})



app.post('/admin/approvedloans/disburse', (req,res) =>{
    const loanId = req.body.loanId
    console.log(loanId)
    ApplyLoan.update(
        {loanStatus:"Disbursed"},
        {where:{loanId:loanId}}
    ).then(result =>{
        res.send({"message":"Loan Status updates successfully"})
    }).catch(error =>{
        res.send({"Message":"Error status could not be updated!"});
    })
})

app.post('/cancelLoan', (req,res)=>{
    console.log("Canceling the loan", req.body)

    const loanId = req.body.loanid
    console.log("Canceling the loan of id", loanId)
    ApplyLoan.destroy(
        {
        where: {loanId:loanId}
        }).then(result =>{
            res.send({"Message":"Loan canceled successfully"})
        }).catch(error=>{
            console.log("Geting this eror", error)
            res.send({"Message":"Error loan could not be canceled"})
        })
})

app.post('/notifications', (req,res) =>{
    const source = req.body.source
    const phonenumber = req.body.phonenumber
    const message = req.body.message

    Notify.create(
        {
            sourceName:source,
            phonenumber:phonenumber,
            message:message
        }
        ).then(response =>{
        res.send("Notification successfully sent!")
    }).catch(err =>{
        console.log(err)
    })
})

app.get('/notifications', (req,res) =>{
    Notify.findAll().then(response =>{
        console.log("Kumekujwo");
        res.send(response)
    }).catch(err =>{
        console.log(err)
    })
})








sequelize.sync().then(req =>{

    app.listen(3001,()=>{
        console.log('Server running on port 3001');
    });
});