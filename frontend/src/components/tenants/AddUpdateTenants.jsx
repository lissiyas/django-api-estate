import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom';


import './add.css'

const TenantForm = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [tenant, setTenant] = useState({
    name: "",
    address: "",
    property: null,
    unit_type: "",
    agreement_end_date: "",
    monthly_rent_date: "",
    rent_cost: 0.0,
    document: null,  // Add the document field
  });

  // Fetch properties for dropdown options
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (id) {
        // Fetch the specific tenant data for updating
        axios.get(`http://127.0.0.1:8000/api/tenants/${id}`)
            .then(response => {
              setTenant({ ...response.data, id: id });
                setIsUpdateMode(true);

            })
            .catch(error => console.error('Error fetching tenant', error));
    } else {
        // Fetch all tenants data
        axios.get('http://127.0.0.1:8000/api/tenants/')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching tenants', error));
    }
}, [id]);

  

  useEffect(() => {
    // Fetch properties from the backend API
    axios.get("http://127.0.0.1:8000/api/properties/")
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  }, []);






  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenant({ ...tenant, [name]: value });
  };

  // Handle document file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setTenant({ ...tenant, document: selectedFile });
  };
  const navigate = useNavigate();
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', tenant.name);
    formData.append('address', tenant.address);
    formData.append('property', tenant.property);
    formData.append('unit_type', tenant.unit_type);
    formData.append('agreement_end_date', tenant.agreement_end_date);
    formData.append('monthly_rent_date', tenant.monthly_rent_date);
    formData.append('rent_cost', tenant.rent_cost);
    formData.append('document', tenant.document)
    try {
        if (isUpdateMode) {
            // Update existing tenant
            await axios.put(`http://127.0.0.1:8000/api/tenants/${tenant.id}/`, formData);
            console.log('Tenant updated:', tenant);
        } else {
            // Add new tenant
            await axios.post('http://127.0.0.1:8000/api/tenants/', formData);
            console.log('Tenant added:', tenant);
            navigate("/tenants")
        }
        // Refresh the tenant list after adding/updating
        await refreshTenants();
        // Reset form after submit
        setTenant({ 
            name: '', 
            address: '' });         
        setIsUpdateMode(false);
    } catch (error) {
        console.error('Error while submitting form:', error);
    }
};

  const refreshTenants = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/tenants/');
        setData(response.data);
    } catch (error) {
        console.log('Error fetching tenants:', error);
    }
};

  return (
    <div className="custom-form-container container  tenant-form">
      <h2>{isUpdateMode ? 'Update Tenant' : 'Add Tenant'}</h2>
      <div className="box-form"> 
      <form className="stylish-form custom-form" encType="multipart/form-data">
        {/* Other input fields... */}
        <input
          type="text"
          name="name"

          onChange={handleChange}
          placeholder="Name"
        />

        <input
          type="text"
          name="address"

          onChange={handleChange}
          placeholder="Address"
        />
        <select name="property" value={tenant.property} onChange={handleChange}>
          <option value="">Select Property</option>
          {properties.map(property => (
            <option key={property.id} value={property.id}>
              {property.name}
            </option>
          ))}
        </select>
         
        <select name="unit_type" value={tenant.unit_type} onChange={handleChange} required>
          <option value="">Select Unit Type</option>
          <option value="1BHK">1 BHK</option>
          <option value="2BHK">2 BHK</option>
          <option value="3BHK">3 BHK</option>
          <option value="4BHK">4 BHK</option>
        </select>

        
        <input
          type="date"
          name="agreement_end_date"

          onChange={handleChange}
          placeholder="agreement end date"
        />
        <input
          type="date"
          name="monthly_rent_date"

          onChange={handleChange}
          placeholder="monthly rent bdate"
        />


        <label>Document:</label>
        <input type="file" name="document" onChange={handleFileChange} />

        <button onClick={handleAddOrUpdate}>
                    {isUpdateMode ? 'Update' : 'Add'}
                </button>
      </form>
      </div>
    </div>
  );
};

export default TenantForm;
