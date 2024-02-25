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
