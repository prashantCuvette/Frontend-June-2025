import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useState } from "react";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route>
          <Route
            index
            path="/"
            element={user ? <Home user={user} /> : <Login />}
          />
          <Route path="/profile" element={user ? <UserProfile /> : <Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
