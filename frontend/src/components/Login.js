import { useState } from 'react';
import API from '../api/api';
export default function Login({setToken}){
  const [form,setForm]=useState({email:'',password:''});
  const [msg,setMsg]=useState('');
  const handleChange=e=>setForm({...form,[e.target.name]:e.target.value});
  const handleSubmit=async e=>{ e.preventDefault(); try{ const res=await API.post('/auth/login',form); localStorage.setItem('token',res.data.token); setToken(res.data.token); setMsg(res.data.message);}catch(err){setMsg(err.response?.data?.message||'Error');}};
  return (<div><h2>Login</h2><form onSubmit={handleSubmit}><input name='email' placeholder='Email' onChange={handleChange}/><br/><input type='password' name='password' placeholder='Password' onChange={handleChange}/><br/><button type='submit'>Login</button></form><p>{msg}</p></div>);
}
