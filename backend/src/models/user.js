import mongoose from "mongoose"
import bcrypt from "bcryptjs"
const UserSchema= new mongoose.Schema (
  {
    fullname:{
      required: true,
      type:String,
    },
    email:{
      type:String,
      required:true,
      unique:true,
    },
     password:{
      type:String,
      required:true,
      minlength:6,
    },
      bio:{
      type:String,
      default:"",
    },
      profilePic:{
        type:String,
        default:"",
      },
      nativelanguage:{
        type:String,
        default:"",
      },
      learninglanguage:{
        type:String,
        default:"",
      },
      location:{
        type:String,
        default:"",
      },
      isOnboarded:{
        type:Boolean,
        default:false,
      },
      friends:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
        }
      ],
  },

{timestamps:true})


//prehook
// UserSchema.pre("save",async function(next){
//   try {
//     const salt=await bcrypt.genSalt(10);
//     this.password= await bcrypt.hash(this.password,salt);
//     next();
//   } catch (error) {
//      next(error)
//   }
// })

UserSchema.pre("save",async function(next){
  if(!this.isModified("password"))return next();
  try {
    this.password = bcrypt.hash(this.password,10)//encrypt password
    next()
    
  } catch (error) {
    next(error); 
  }
  
})

const User= mongoose.model("User",UserSchema);

export default User;