import { useState,useEffect } from 'react';
import API from '../api/api';
export default function Dashboard(){
  const [tasks,setTasks]=useState([]);
  const [title,setTitle]=useState('');
  const [msg,setMsg]=useState('');
  const fetchTasks=async()=>{ const res=await API.get('/tasks'); setTasks(res.data);};
  useEffect(()=>{ fetchTasks(); },[]);
  const handleCreate=async()=>{ try{ const res=await API.post('/tasks',{title}); setMsg(res.data.message); fetchTasks(); } catch(err){ setMsg('Error'); }};
  return (<div><h2>Dashboard</h2><input placeholder='Task Title' value={title} onChange={e=>setTitle(e.target.value)}/><button onClick={handleCreate}>Add Task</button><p>{msg}</p><ul>{tasks.map(t=><li key={t.id}>{t.title}</li>)}</ul></div>);
}
