import "./App.css";
import { useState, useEffect } from "react";
import AddUser from "./components/AddUser";
import DeleteUser from "./components/DeleteUser";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const res = fetchData()
    // console.log(res);
  }, []);
  
  const fetchData = async () => {
    const res = await fetch("/api/getAll");
    const result = await res.json();
    setData(result);
    // console.log(result);
    return result;
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data.map((item) => item.name + "\n")}</p>

        {/* <AddUser/> */}
        {/* <DeleteUser/> */}

        <Router>
          <Routes>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/home" element={<Home authed={true}/>}/>
          </Routes>
          {/* <Login/> */}
        </Router>
      </header>
    </div>
  );
}

export default App;
