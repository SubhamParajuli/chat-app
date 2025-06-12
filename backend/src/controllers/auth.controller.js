import User from "../models/user.js"
import jwt from "jsonwebtoken"



export async function signup(req,res){
  const {email, fullName, password}=req.body;
  try {
    
    if(!email || !password|| !fullName){
      return res.status(400).json({message: "All fields are required."})
    }

    if(password.length<6){
       return res.status(400).json({message: "Password must be at least 6 characters."})
      }
   
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser=await User.findOne({email});
    if(existingUser){
      return res.status(400).json({ message: "Email already exists,please use a different one" });
    }

    const indx=Math.floor(Math.random()*100)+1;
    const Avatar =`https://avatar.iran.liara.run/public/${indx}`

    const newUser= new User.create({
      email,
      fullName,
      password,
      profilePic: Avatar,
    })


  } catch (error) {
    
  }
}

export async function login(req,res){
  res.send("Login Route");
}

export async function logout(req,res){
  res.send("Logout Route");
}