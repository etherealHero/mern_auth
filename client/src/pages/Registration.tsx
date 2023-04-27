import { FormEventHandler, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../entities"
import { API_URL } from "../shared"

const Registraion = () => {
  const [form, setForm] = useState<[string, string]>(["", ""])
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault()

    const res = await fetch(`${API_URL}/auth/registration`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: form[0], password: form[1] }),
    })

    if (res.ok) {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form[0], password: form[1] }),
      })

      const { token } = await res.json()

      login(token)
      navigate("/")
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="text-3xl font-bold mb-5">Registration Page</h1>
      <div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="my-4 flex flex-col gap-y-5 "
        >
          <input
            placeholder="email"
            type="email"
            className="input input-bordered block"
            value={form[0]}
            onChange={(e) => setForm([e.target.value, form[1]])}
          />
          <input
            placeholder="password"
            type="password"
            className="input input-bordered block"
            value={form[1]}
            onChange={(e) => setForm([form[0], e.target.value])}
          />
          <input type="submit" value="Sign up" className="btn btn-info" />
        </form>
      </div>
      <Link to="/login" className="link link-accent">
        Login
      </Link>
    </div>
  )
}

export default Registraion
