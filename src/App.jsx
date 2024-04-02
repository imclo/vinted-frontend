import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";
import Cookies from "js-cookie";

// Import Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

// Import components
import Header from "./components/Header";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState(false);
  const [fetchRange, setFetchRange] = useState([0, 10000]);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  return (
    <>
      <Router>
        <Header
          token={token}
          handleToken={handleToken}
          setSearch={setSearch}
          setFetchRange={setFetchRange}
          fetchRange={fetchRange}
          sortPrice={sortPrice}
          setSortPrice={setSortPrice}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                fetchRange={fetchRange}
                sortPrice={sortPrice}
              />
            }
          />
          <Route path="/offer/:id" element={<Offer token={token} />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
          <Route path="/publish" element={<Publish token={token} />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
