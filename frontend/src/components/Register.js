import { useState } from 'react';
import API from '../api/api';
export default function Register(){
  const [form,setForm]=useState({name:'',email:'',password:''});
  const [msg,setMsg]=useState('');
  const handleChange=e=>setForm({...form,[e.target.name]:e.target.value});
  const handleSubmit=async e=>{ e.preventDefault(); try{ const res=await API.post('/auth/register',form); setMsg(res.data.message);} catch(err){setMsg(err.response?.data?.message||'Error');}};
  return (<div><h2>Register</h2><form onSubmit={handleSubmit}><input name='name' placeholder='Name' onChange={handleChange}/><br/><input name='email' placeholder='Email' onChange={handleChange}/><br/><input type='password' name='password' placeholder='Password' onChange={handleChange}/><br/><button type='submit'>Register</button></form><p>{msg}</p></div>);
}
