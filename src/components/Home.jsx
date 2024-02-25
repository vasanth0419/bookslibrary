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
