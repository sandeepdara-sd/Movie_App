import User from "../model/User.js";
import bcrypt from 'bcryptjs'

export const getAllUsers = async(req,res,next)=>{
    let users;
    try{
        users = await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"No users found"})
    }
    return res.status(200).json({users})
}


export const signup = async(req,res,next)=>{
    const {name,email,password} = req.body;

    let existigUser;

    try{
        existigUser = await User.findOne({email});
    }catch(err){
       return console.log(err);
    }

    if(existigUser){
        return res.status(400).json({message:"User already existed!! Login Instead"})
    }
    const hashedPassword = bcrypt.hashSync(password)

    const user = new User({
        name,
        email,
        password:hashedPassword,
        blogs:[]
    })

    try {
        await user.save()
    } catch (err) {
        return console.log(err);
    }
    return res.status(201).json({user})
}

export const login = async(req,res,next)=>{
    const {email,password} = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({email})
    }catch(err){
       return console.log(err);
    }

    if(!existingUser){
        return res.status(404).json({message:"Couldn't find an account with this email"})
    }

    const isValidPassword = bcrypt.compareSync(password,existingUser.password)

    if(!isValidPassword){
        return res.status(400).json({message:'Incorrect Password'});
    }
    return res.status(200).json({message:'Login Successful!!',user:existingUser})
}
export const getById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findById(id);
    } catch (err) {
        return res.status(500).json({ message: "Error retrieving user", error: err });
    }

    if (!user) {
        return res.status(404).json({ message: "No user found with the given ID!" });
    }
    return res.status(200).json({ user });
};






