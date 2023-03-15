const mongoose = require('mongoose')
const bcrpyt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]

    }
})

userSchema.pre("save",async function(next){
    const salt = await bcrpyt.genSalt();
    this.password = await bcrpyt.hash(this.password,salt)


})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrpyt.compare(password,user.password)
        console.log(auth)
        if(auth){
            return user
        }else{
            throw Error ("incorrect password")
        }
    }else{
        throw Error ("incorrect email")
    }
}

module.exports = mongoose.model('Users',userSchema)