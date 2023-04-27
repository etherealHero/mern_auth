import { Navigate } from "react-router-dom"
import { useAuth } from "../entities"
import { useEffect, useState } from "react"
import { API_URL } from "../shared"

interface INote {
  title: string
  owner: string
  _id: string
}

const Dashboard = () => {
  const [notes, setNotes] = useState<INote[]>()
  const { token, logout } = useAuth()

  useEffect(() => {
    fetch(`${API_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setNotes(data))
  }, [])

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Dashboard. Welcome</h1>
      <table className="table table-zebra table-compact w-full max-w-md">
        {/* head */}
        <thead>
          <tr>
            <th>№</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {notes?.length ? (
            notes.map((note, idx) => (
              <tr key={note._id}>
                <th>{idx}</th>
                <td>{note.title}</td>
              </tr>
            ))
          ) : (
            <tr>
              <th></th>
              <td>Empty</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="btn mt-5" onClick={logout}>
        Logout
      </button>
    </>
  )
}

export default Dashboard
