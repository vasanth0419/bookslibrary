import React from "react";
import "./style/style.css";
import { Link, useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();
  const HandleAdd = () => {
    navigate("/addbook");
  };
  return (
    <div className="container-fluid">
      <nav className="navbar  nav navbar-expand-lg ">
        <a className="navbar-brand" href="#">
          <i className="bi bi-book"></i>
          BOOKS LIBRARY
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">
                Books
              </Link>
            </li>
          </ul>
          <button
            className="btn btn-outline-light my-2 my-sm-0"
            onClick={HandleAdd}
          >
            Add Books
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
