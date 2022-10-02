const  Sequelize = require('sequelize');
const sequelize = require("../database/connection");


const userSchema ={
    userId:{
        type:Sequelize.INTEGER(100),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    firstname:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    lastname:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
        validate:{
            notEmpty:true,
        }
    },
    phonenumber:{
        type: Sequelize.BIGINT,
        allowNull:false,
        unique:true,
        validate:{
        notEmpty:true
            }
    },
    IDnumber:{
        type: Sequelize.BIGINT,
        allowNull:false,
        unique:true,
        validate:{
            notEmpty:true
        }
    },
    password:{
        type: Sequelize.STRING(500),
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
}


const ApplyLoanSchema = {
    loanId:{
        type:Sequelize.INTEGER(100),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    firstname:{
        type: Sequelize.STRING(255),
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    lastname:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    IDnumber:{
        type: Sequelize.BIGINT,
        allowNull:false,
        unique:true,
        validate:{
            notEmpty:true
        }
    },
    phonenumber:{
        type: Sequelize.BIGINT,
        allowNull:false,
        unique:true,
        validate:{
            notEmpty:true
        }
    },
    amount:{
        type: Sequelize.BIGINT,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    duration:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    purpose:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    g1firstname:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }, 
    g1lastname:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    g1IDnumber:{
        type: Sequelize.BIGINT,
        allowNull:false,
        unique:true,
        validate:{
            notEmpty:true
        }
    },
    g1phonenumber:{
        type: Sequelize.BIGINT,
        allowNull:false,
        unique:true,
        validate:{
            notEmpty:true
        }
    },
    g2firstname:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    g2lastname:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    g2IDnumber:{
        type: Sequelize.BIGINT,
        allowNull:false,
        unique:true,
        validate:{
            notEmpty:true
        }
    },
    g2phonenumber:{
        type: Sequelize.BIGINT,
        allowNull:false,
        unique:true,
        validate:{
            notEmpty:true
        }
    },
    loanStatus:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
}

const outstandingLoanSchema = {
    loanId:{
        type:Sequelize.INTEGER(10),
        allowNull:false,
        primaryKey:true,
        },
    applicantfirstName:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    applicantPhone:{
        type:Sequelize.INTEGER(20),
        allowNull:false
    },
    amount:{
        type:Sequelize.INTEGER(20),
        allowNull:false
    },
    purpose:{
        type:Sequelize.STRING(100),
        allowNull:false,
    },
    guarantor1Name:{
        type:Sequelize.STRING(30),
        allowNull:false,
        unique:true
    },
    guarantor1Phone:{
        type:Sequelize.INTEGER(20),
        allowNull:false
    },
    guarantor2Name:{
        type:Sequelize.STRING(30),
        allowNull:false,
        unique:true
    },
    guarantor2Phone:{
        type:Sequelize.INTEGER(20),
        allowNull:false
    }
}

const declinedLoanSchema ={
    loanId:{
        type:Sequelize.INTEGER(10),
        allowNull:false,
        primaryKey:true,
        },
    applicantfirstName:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    applicantPhone:{
        type:Sequelize.INTEGER(20),
        allowNull:false
    },
    amount:{
        type:Sequelize.INTEGER(20),
        allowNull:false
    },
    purpose:{
        type:Sequelize.STRING(100),
        allowNull:false,
    },
    guarantor1Name:{
        type:Sequelize.STRING(30),
        allowNull:false,
        unique:true
    },
    guarantor1Phone:{
        type:Sequelize.INTEGER(20),
        allowNull:false
    },
    guarantor2Name:{
        type:Sequelize.STRING(30),
        allowNull:false,
        unique:true
    },
    guarantor2Phone:{
        type:Sequelize.INTEGER(20),
        allowNull:false
    }
}
// const officialsschema ={
//     OfficialId:{
//         type:Sequelize.INTEGER(100),
//         allowNull:false,
//         primaryKey:true,
//         autoIncrement:true
//     },
//     firstname:{
//         type: Sequelize.STRING,
//         allowNull:false,
//         validate:{
//             notEmpty:true
//         }
//     },
//     lastname:{
//         type: Sequelize.STRING,
//         allowNull:false,
//         validate:{
//             notEmpty:true
//         }
//     },
//     email:{
//         type: Sequelize.STRING,
//         allowNull:false,
//         validate:{
//             notEmpty:true,
//         }
//     },phonenumber:{
//         type: Sequelize.BIGINT,
//         allowNull:false,
//         validate:{
//             notEmpty:true
//     }
//     },
//     IDnumber:{
//         type: Sequelize.BIGINT,
//         allowNull:false,
//         validate:{
//             notEmpty:true
//         }
//     },
//     password:{
//         type: Sequelize.STRING(500),
//         allowNull:false,
//         validate:{
//             notEmpty:true
//         }
//     }
// }

const savingsSchema = {
    savingDepositId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    firstname:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    lastname:{
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    phonenumber:{
        type: Sequelize.BIGINT,
        allowNull:false,
        validate:{
        notEmpty:true
        }
    },
    savingsamount:{
            type:Sequelize.INTEGER(20),
            allowNull:false
    }

}
//Loans section





const User = sequelize.define('User',userSchema,{timestamps: true});
const ApplyLoan =sequelize.define('ApplyLoan', ApplyLoanSchema,{timestamps:true});
const OutstandingLoan = sequelize.define('OutstandingLoan',outstandingLoanSchema,{timestamps:true});
const DeclinedLoan = sequelize.define('DeclinedLoan',declinedLoanSchema,{timestamps:true});
const Savings = sequelize.define('Savings', savingsSchema,{timestamps:true});

User.hasOne(OutstandingLoan);
User.hasMany(Savings);
User.hasOne(ApplyLoan);
ApplyLoan.belongsTo(User);




module.exports={
    User,
    ApplyLoan,
    OutstandingLoan,
    DeclinedLoan,
    // Officials,
    Savings
}