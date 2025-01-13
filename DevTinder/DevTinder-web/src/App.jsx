import { Routes, Route } from "react-router-dom"
import Login from "./components/login"
import Body from "./components/Body"
import Profile from "./components/Profile"
import Feed from "./components/Feed"
import Connections from "./components/Connections"
import Request from "./components/Request"



function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/request" element={<Request/>} />
        </Route>
      </Routes>

    </>
  )
}

export default App
