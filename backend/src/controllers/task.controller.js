import Task from '../models/task.model.js';

export const createTask = async(req,res)=>{
    const {title,description}=req.body;
    if(!title) return res.status(400).json({message:'Title is required'});
    const task = await Task.create({title,description,userId:req.user.id});
    res.status(201).json({message:'Task created',task});
};

export const getTasks = async(req,res)=>{
    const tasks = await Task.findAll({where:{userId:req.user.id}});
    res.json(tasks);
};

export const updateTask=async(req,res)=>{
    const task=await Task.findByPk(req.params.id);
    if(!task) return res.status(404).json({message:'Task not found'});
    if(task.userId!==req.user.id && req.user.role!=='admin') return res.status(403).json({message:'Forbidden'});
    task.title=req.body.title||task.title;
    task.description=req.body.description||task.description;
    await task.save();
    res.json({message:'Task updated',task});
};

export const deleteTask=async(req,res)=>{
    const task=await Task.findByPk(req.params.id);
    if(!task) return res.status(404).json({message:'Task not found'});
    if(req.user.role!=='admin') return res.status(403).json({message:'Admins only can delete'});
    await task.destroy();
    res.json({message:'Task deleted'});
};
