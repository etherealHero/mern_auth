import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Dashboard, Login, Registraion } from "../pages"
import { AuthProvider } from "../entities"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registraion />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
