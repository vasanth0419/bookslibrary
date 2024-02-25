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
