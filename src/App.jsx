import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register, Login, Presence, News } from "./pages";

const App = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/presence" element={<Presence />} />
                <Route path="/news" element={<News />} />
            </Routes>
        </Router>
    </div>
  )
}

export default App