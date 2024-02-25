# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#### books library website [formik task]

#### _* 1st step to create a empty folder for a project and create react project with in the folder`bookslibrary`*_

#### code to create a react `npm create vite@latest bookslibray`

#### install `npm install axios`

#### install `npm install formik`

#### install `npm install yup`

### follow the steps one by one atlast install router-dom `npm i react-router-dom`

#### formik validation in forms..

#### in my site we can use CRUD operation..

### create a components as for recuirement

#### codes in `app.jsx`

```
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


```

#### codes `Home.jsx`

```
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/style.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://65d8c3b4c96fbb24c1bc42c3.mockapi.io/books/books"
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetails = (index) => {
    setSelectedBook(data[index]);
    const offcanvas = new bootstrap.Offcanvas(
      document.getElementById(`offcanvasRight${index}`)
    );
    offcanvas.show();
  };

  return (
    <div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {data.map((item, index) => (
            <div key={index} className="col">
              <div className="card">
                <img className="card-img-top" src={item.image} alt="Card cap" />
                <div className="card-body">
                  <h5 className="card-title text-center">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">
                    <span className="fw-bold">by</span> {item.authorname}
                  </p>
                  <p>
                    <span className="fw-bold">Publication :</span>
                    {item.publication}
                  </p>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => handleDetails(index)}
                  >
                    Book Details
                  </button>

                  <div
                    className="offcanvas offcanvas-end"
                    tabIndex="-1"
                    id={`offcanvasRight${index}`}
                    aria-labelledby={`offcanvasRightLabel${index}`}
                  >
                    <div className="offcanvas-header">
                      <h5
                        className="offcanvas-title"
                        id={`offcanvasRightLabel${index}`}
                      >
                        {selectedBook && selectedBook.title}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="offcanvas-body">
                      {selectedBook && (
                        <>
                          <img src={selectedBook.image} alt="" />
                          <p>{selectedBook.description}</p>
                          <p>
                            <span className="fw-bold">Author's Name : </span>
                            {selectedBook.authorname} ({selectedBook.dob})
                          </p>
                          <p>
                            <span className="fw-bold">Biography : </span>
                            {selectedBook.shortbio}
                          </p>
                          <p>
                            <span className="fw-bold">ISBN NO :</span>{" "}
                            {selectedBook.isbn}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;


```

#### codes `NavBar.jsx`

```
import React from "react";
import "./style/style.css";
import { Link, useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate()
  const HandleAdd = () => {
    navigate("/addbook")
  }
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

            <li className="nav-item">
              <Link className="nav-link" to="/details">
                Contact us
              </Link>
            </li>
          </ul>
          <button className="btn btn-outline-light my-2 my-sm-0" onClick={HandleAdd}>
            Add Books
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;


```

#### codes `Books.jsx`

```

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style/style.css";
import { useNavigate } from "react-router-dom";
const Books = ({ setid }) => {
  const [books, setBooks] = useState([]);
  const [deletedata, setdeletedata] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchDatas();
  }, [deletedata]);

  const fetchDatas = async () => {
    try {
      const response = await axios.get(
        "https://65d8c3b4c96fbb24c1bc42c3.mockapi.io/books/books"
      );
      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const Handleedit = (id) => {
    setid(id);
    navigate(`/editbook/${id}`);
  };
  const Handledelete = async (id) => {
    await axios
      .delete(`https://65d8c3b4c96fbb24c1bc42c3.mockapi.io/books/books/${id}`)
      .then((res) => setdeletedata(res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="container">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">S.N0</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Author</th>
              <th scope="col">Publication</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.title}</td>
                <td>{item.description}</td>

                <td>{item.authorname}</td>
                <td>{item.publication}</td>

                <td>
                  <button onClick={() => Handleedit(item.id)}>
                    <i className="bi bi-pencil-square text-secondary"></i>
                  </button>
                </td>
                <td>
                  <button onClick={() => Handledelete(item.id)}>
                    <i className="bi bi-trash text-secondary"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
```

#### codes `AddBooks.jsx`

```

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./style/style.css";
import { useFormik } from "formik";

const AddBook = () => {
  const navigate = useNavigate();
  const [addData, setaddData] = useState({
    title: "",
    description: "",
    isbn: "",
    publication: "",
    authorname: "",
    dob: "",
    shortbio: "",
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    isbn: Yup.string().required("ISBN is required"),
    publication: Yup.string().required("Publication is required"),
    authorname: Yup.string().required("Author name is required"),
    dob: Yup.string().required("Date of Birth is required"),
    shortbio: Yup.string().required("Biography is required"),
  });

  const formik = useFormik({
    initialValues: { addData },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(
          "https://65d8c3b4c96fbb24c1bc42c3.mockapi.io/books/books",
          values
        );
        alert("Added successful");
        navigate("/books");
      } catch (err) {
        console.error("Error adding book:", err);
      }
    },
  });
  return (
    <div className="container add">
      <form onSubmit={formik.handleSubmit}>
        <h4 className="text-decoration-underline text-center">BOOK DETAILS</h4>
        <div>
          <label>Title : </label>
          <br />
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <div className="text-danger">{formik.errors.title}</div>
        </div>
        <div>
          <label>Description : </label>
          <br />
          <input
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <div className="text-danger">{formik.errors.description}</div>
        </div>
        <div>
          <label>ISBN NO : </label>
          <br />
          <input
            type="text"
            name="isbn"
            value={formik.values.isbn}
            onChange={formik.handleChange}
          />
          <div className="text-danger">{formik.errors.isbn}</div>
        </div>
        <div>
          <label>PUBLICATION DATE : </label>
          <br />
          <input
            type="text"
            name="publication"
            value={formik.values.publication}
            onChange={formik.handleChange}
          />
          <div className="text-danger">{formik.errors.publication}</div>
        </div>
        <hr />
        <h4 className="text-decoration-underline text-center">
          AUTHOR DETAILS
        </h4>
        <div>
          <label>AUTHOR NAME : </label>
          <br />
          <input
            type="text"
            name="authorname"
            value={formik.values.authorname}
            onChange={formik.handleChange}
          />
          <div className="text-danger">{formik.errors.authorname}</div>
        </div>
        <div>
          <label>DATE OF BIRTH : </label>
          <br />
          <input
            type="text"
            name="dob"
            value={formik.values.dob}
            onChange={formik.handleChange}
          />
          <div className="text-danger">{formik.errors.dob}</div>
        </div>
        <div>
          <label>BIOGRAPHY : </label>
          <br />
          <input
            type="text"
            name="shortbio"
            value={formik.values.shortbio}
            onChange={formik.handleChange}
          />
          <div className="text-danger">{formik.errors.shortbio}</div>
        </div>

        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddBook;
```

#### codes `Editbook.jsx`

```
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./style/style.css";
import { useFormik } from "formik";

const Editbook = ({ id }) => {
  const navigate = useNavigate();
  const [editData, seteditData] = useState({
    title: "",
    description: "",
    isbn: "",
    publication: "",
    authorname: "",
    dob: "",
    shortbio: "",
  });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await axios
      .get(`https://65d8c3b4c96fbb24c1bc42c3.mockapi.io/books/books/${id}`)
      .then((response) => seteditData(response.data))
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    formik.setValues(editData);
  }, [editData]);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    isbn: Yup.string().required("ISBN is required"),
    publication: Yup.string().required("Publication is required"),
    authorname: Yup.string().required("Author name is required"),
    dob: Yup.string().required("Date of Birth is required"),
    shortbio: Yup.string().required("Biography is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      isbn: "",
      publication: "",
      authorname: "",
      dob: "",
      shortbio: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(
          `https://65d8c3b4c96fbb24c1bc42c3.mockapi.io/books/books/${id}`,
          values
        );
        alert("Updated successful");
        navigate("/books");
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div>
      <div className="container add">
        <form onSubmit={formik.handleSubmit}>
          <h4 className="text-decoration-underline text-center">
            BOOK DETAILS
          </h4>
          <div>
            <label>Title : </label>
            <br />
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <div className="text-danger">{formik.errors.title}</div>
          </div>
          <div>
            <label>Description : </label>
            <br />
            <input
              type="text"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <div className="text-danger">{formik.errors.description}</div>
          </div>
          <div>
            <label>ISBN NO : </label>
            <br />
            <input
              type="text"
              name="isbn"
              value={formik.values.isbn}
              onChange={formik.handleChange}
            />
            <div className="text-danger">{formik.errors.isbn}</div>
          </div>
          <div>
            <label>PUBLICATION DATE : </label>
            <br />
            <input
              type="text"
              name="publication"
              value={formik.values.publication}
              onChange={formik.handleChange}
            />
            <div className="text-danger">{formik.errors.publication}</div>
          </div>
          <hr />
          <h4 className="text-decoration-underline text-center">
            AUTHOR DETAILS
          </h4>
          <div>
            <label>AUTHOR NAME : </label>
            <br />
            <input
              type="text"
              name="authorname"
              value={formik.values.authorname}
              onChange={formik.handleChange}
            />
            <div className="text-danger">{formik.errors.authorname}</div>
          </div>
          <div>
            <label>DATE OF BIRTH : </label>
            <br />
            <input
              type="text"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
            />
            <div className="text-danger">{formik.errors.dob}</div>
          </div>
          <div>
            <label>BIOGRAPHY : </label>
            <br />
            <input
              type="text"
              name="shortbio"
              value={formik.values.shortbio}
              onChange={formik.handleChange}
            />
            <div className="text-danger">{formik.errors.shortbio}</div>
          </div>

          <button type="submit" className="btn btn-success">
            update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editbook;
```
