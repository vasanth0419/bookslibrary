import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Books from "./components/Books";
import AddBook from "./components/AddBook";
import NavBar from "./components/NavBar";
import "./App.css";
import Editbook from "./components/Editbook";

const App = () => {
  const [id,setid]=useState(0)
  return (
    <div>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books setid={setid} />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/editbook/:id" element={<Editbook id={id} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
