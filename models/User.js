module.exports = (sequelize, Datatypes) =>{
    const User = sequelize.define("User",{
        userId:{
            type:Datatypes.INTEGER(100),
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        firstname:{
            type: Datatypes.STRING,
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
        email:{
            type: Datatypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true,
            }
        },phonenumber:{
            type: Datatypes.BIGINT,
            allowNull:false,
            validate:{
                notEmpty:true
        }
        },
        IDnumber:{
            type: Datatypes.BIGINT,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        password:{
            type: Datatypes.STRING(500),
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }
    },
    {timestamps:true},
    );
    return User;
}