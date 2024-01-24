import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { MoreVerticalFill } from 'akar-icons';



export default function Tenants() {
  const [propertyName, setPropertyName] = useState('');

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/properties/${id}`);
      const data = response.data;
      console.log(data);

      // Check if property exists in the API response
      const name = data.id ? data.name : 'No Property';
      console.log(name);

      setPropertyName(name);
    } catch (error) {
      console.error('Error fetching data from API:', error);
      setPropertyName('Error fetching data');
    }
  };

  useEffect(() => {
    const propertyId = '51'; // Replace with the actual ID you want to fetch
    fetchData(propertyId);
  }, []);

////

  const [data, setData] = useState([]);



  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/tenants/${id}/`)
      .then(() => {
        // Remove the deleted property from the state
        setData(prevData => prevData.filter(item => item.id !== id));
        console.log(id);
      })
      .catch(error => {
        console.log('Error deleting property', error);
      });
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tenants/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log('There is an error', error);
      });
  }, []); // Adding an empty dependency array to ensure it runs once


  return (
    <div className="container">
      <div className="table-responsive">
        <table border="2" className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">Sl No:</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Property</th>
              <th scope="col">Unit Type</th>
              <th scope="col">Rent Cost</th>
              <th scope="col">Agreement Document</th>
              <th scope="col">Agreement End Date</th>
              <th scope="col">Monthly Rent Date</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item , index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td >

              
                {item.property}
               
               
                </td>
                <td>{item.unit_type}</td>
                <td>{item.rent_cost}</td>
                <td>
                  {item.document ? (
                    <a href={item.document.url} download={item.document.name}>
                      Download PDF
                    </a>
                  ) : (
                    "No Document"
                  )}
                </td>
                <td>{item.agreement_end_date}</td>
                <td>{item.monthly_rent_date}</td>
                <td>

                  <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <MoreVerticalFill />
                    </button>
                    <ul className="dropdown-menu">
                      <li><Link to={`/tenant-update/${item.id}`}>
                        <a className=" dropdown-item btn btn-primary " accordion>Update Tenant</a>
                      </Link></li>
                      <li><a
                        
                        className=" dropdown-item btn btn-dark "
                        onClick={() => handleDelete(item.id)}
                        
                      >
                        Delete tenant
                      </a></li>
                      
                    </ul>
                  </div>



                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}