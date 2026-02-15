import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [form, setForm] = useState({})
  const navigate = useNavigate()

  const register = async (e) => {
    e.preventDefault()

    await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(form)
    })

    navigate("/")
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={register} className="bg-white p-6 rounded shadow w-80 space-y-3">
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input placeholder="Name" className="input" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Email" className="input" onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input type="password" placeholder="Password" className="input" onChange={(e)=>setForm({...form,password:e.target.value})}/>

        <button className="bg-green-600 text-white w-full py-2 rounded">Register</button>
      </form>
    </div>
  )
}
