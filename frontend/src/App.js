import { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
export default function App(){
  const [token,setToken]=useState(localStorage.getItem('token')||'');
  if(!token) return (<><Register /><Login setToken={setToken}/></>);
  return <Dashboard />;
}
