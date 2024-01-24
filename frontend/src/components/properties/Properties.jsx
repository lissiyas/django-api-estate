import axios from "axios";
import React, { useState, useEffect } from "react";
import { Location, Globe, ThumbsUp, MoreVerticalFill } from 'akar-icons';

import { Link } from 'react-router-dom';

import './properties.css';


export default function Tenants() {



  ///



  const [data, setData] = useState([]);


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/properties/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log('There is an error', error);
      });
  }, []); // Adding an empty dependency array to ensure it runs once

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/properties/${id}/`)
      .then(() => {
        // Remove the deleted property from the state
        setData(prevData => prevData.filter(item => item.id !== id));
        console.log(id);
      })
      .catch(error => {
        console.log('Error deleting property', error);
      });
  };

  return (
    <div className="align-items-center container justify-content-center">



      <div class="card-container">
        {data.map((item) => (



          <div class="card">
            <div className="card-body mx-2">
              <div className="d-flex  justify-content-between align-items-center">
                <h1 className="card-title text-center">{item.name}</h1>

                <div className="dropdown">
                  <a className="dropdown-toggle btn btn-danger mx-auto my-auto" data-bs-toggle="dropdown" aria-expanded="false">
                    <MoreVerticalFill/>
                  </a>
                  <ul class="dropdown-menu">
                    <li><Link to={`/property-update/${item.id}`}>
                      <a className="btn btn-dark btn-sm dropdown-item">Update property</a>
                    </Link></li>
                    <li><a className="btn btn-danger btn-sm dropdown-item" onClick={() => handleDelete(item.id)}>Delete property</a></li>
                    <li> <a className="btn btn-success btn-sm dropdown-item">Show Tenants</a></li>
                  </ul>
                </div>
              </div>

              <p className="card-text"><Location /> {item.address}</p>
              <p className="card-text"><Globe /> {item.location}</p>
              <p className="card-text"> <ThumbsUp /> {item.features}</p>
            </div>
            <div className="card-body mx-2 ">
              <h5 className="card-title ">Remaining Flats Available</h5>
              <div className="row mt-4">
                <div className="col-6">
                  <p className="card-text">1BHK: {item.flats_1bhk}</p>
                  <p className="card-text">3BHK: {item.flats_3bhk}</p>
                </div>
                <div className="col-6">
                  <p className="card-text">2BHK: {item.flats_2bhk}</p>
                  <p className="card-text">4BHK: {item.flats_4bhk}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>



    </div>
  )
}
