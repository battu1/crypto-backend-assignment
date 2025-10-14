import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
dotenv.config();

export const register = async (req,res)=>{
    const {name,email,password,role}=req.body;
    if(!name||!email||!password) return res.status(400).json({message:'All fields required'});
    const existing = await User.findOne({where:{email}});
    if(existing) return res.status(400).json({message:'Email already registered'});
    const hashed = await bcrypt.hash(password,10);
    const user = await User.create({name,email,password:hashed,role:role||'user'});
    res.status(201).json({message:'User registered',user:{id:user.id,email:user.email}});
};

export const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password) return res.status(400).json({message:'Email & password required'});
    const user = await User.findOne({where:{email}});
    if(!user) return res.status(404).json({message:'User not found'});
    const valid = await bcrypt.compare(password,user.password);
    if(!valid) return res.status(401).json({message:'Invalid password'});
    const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.json({message:'Login successful',token});
};
