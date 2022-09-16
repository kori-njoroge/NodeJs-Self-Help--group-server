module.exports = (sequelize, Datatypes) =>{
    const ApplyLoan = sequelize.define("ApplyLoan",{
        loanId:{
            type:Datatypes.INTEGER(100),
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        firstname:{
            type: Datatypes.STRING(255),
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        lastname:{
            type: Datatypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        IDnumber:{
            type: Datatypes.BIGINT,
            // allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        phonenumber:{
            type: Datatypes.BIGINT,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        amount:{
            type: Datatypes.BIGINT,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        duration:{
            type: Datatypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        purpose:{
            type: Datatypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        g1firstname:{
            type: Datatypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }, 
        g1lastname:{
            type: Datatypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        g1IDnumber:{
            type: Datatypes.BIGINT,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        g1phonenumber:{
            type: Datatypes.BIGINT,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        g2firstname:{
            type: Datatypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        g2lastname:{
            type: Datatypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        g2IDnumber:{
            type: Datatypes.BIGINT,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        g2phonenumber:{
            type: Datatypes.BIGINT,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }
    },
    {timestamps:true},
    );
    return ApplyLoan;
}