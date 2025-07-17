import { Route, Routes } from "react-router"
import Signup from "./pages/auth/Signup"
import Sigin from "./pages/auth/Sigin"
import Dashboard from "./pages/dashboard/Dashboard"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute"

function App() {
  return (
    <>
      <Routes>
        <Route path="signup" element={<Signup/>}/>
        <Route path="signin" element={<Sigin/>}/>
        <Route path="dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute> }/>
        <Route path="admin" element={<AdminProtectedRoute><Dashboard/></AdminProtectedRoute> }/>
        <Route path="/" element={<Sigin/>}/>
      </Routes>
    </>
  )
}

export default App
