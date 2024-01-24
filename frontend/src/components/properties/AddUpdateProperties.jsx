import React, { useState, useEffect } from "react";
import axios from "axios";

// with import


import { useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom';

import './addUpdate.css'

export default function Tenants() {


    const [data, setData] = useState([]);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [currentTenant, setCurrentTenant] = useState({ id: '', name: '', address: '' });
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            // Fetch the specific tenant data for updating
            axios.get(`http://127.0.0.1:8000/api/properties/${id}`)
                .then(response => {
                    setCurrentTenant({ ...response.data, id: id });
                    setIsUpdateMode(true);

                })
                .catch(error => console.error('Error fetching tenant', error));
        } else {
            // Fetch all tenants data
            axios.get('http://127.0.0.1:8000/api/properties/')
                .then(response => setData(response.data))
                .catch(error => console.error('Error fetching tenants', error));
        }
    }, [id]);

    const navigate = useNavigate();

    const handleAddOrUpdate = async () => {
        try {
            if (isUpdateMode) {
                // Update existing tenant
                await axios.put(`http://127.0.0.1:8000/api/properties/${currentTenant.id}/`, currentTenant);
                console.log('Tenant updated:', currentTenant);
                navigate("/properties");
            } else {
                // Add new tenant
                await axios.post('http://127.0.0.1:8000/api/properties/', currentTenant);
                console.log('Tenant added:', currentTenant);
                navigate("/properties");
            }
            // Refresh the tenant list after adding/updating
            await refreshTenants();
            // Reset form after submit
            setCurrentTenant({
                name: '',
                address: ''
            });
            setIsUpdateMode(false);
        } catch (error) {
            console.error('Error while submitting form:', error);
        }
    };

    const handleChange = (e) => {
        setCurrentTenant({ ...currentTenant, [e.target.name]: e.target.value });
    };



    const refreshTenants = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/properties/');
            setData(response.data);
        } catch (error) {
            console.log('Error fetching tenants:', error);
        }
    };

    return (
        <div >
            <h2 className="text-center">{isUpdateMode ? 'Update Property' : 'Add Property'}</h2>


            <div className="form-container d-flex">
                <div className="image-container">
                    <img src='./assets/addproperty.jpeg' alt="Property Image" />
                </div>

                <div className="form-fields">
                    <input
                        type="text"
                        name="name"
                        value={currentTenant.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />

                    <input
                        type="text"
                        name="address"
                        value={currentTenant.address}
                        onChange={handleChange}
                        placeholder="Address"
                    />
                    <input
                        type="text"
                        name="location"
                        value={currentTenant.location}
                        onChange={handleChange}
                        placeholder="location"
                    />
                    <input
                        type="text"
                        name="features"
                        value={currentTenant.features}
                        onChange={handleChange}
                        placeholder="features"
                    />
                    <input
                        type="text"
                        name="flats_1bhk"
                        value={currentTenant.flats_1bhk}
                        onChange={handleChange}
                        placeholder="flats_1bhk"
                    />
                    <input
                        type="text"
                        name="flats_2bhk"
                        value={currentTenant.flats_2bhk}
                        onChange={handleChange}
                        placeholder="flats_2bhk"
                    />
                    <input
                        type="text"
                        name="flats_3bhk"
                        value={currentTenant.flats_3bhk}
                        onChange={handleChange}
                        placeholder="flats_3bhk"
                    />
                    <input
                        type="text"
                        name="flats_4bhk"
                        value={currentTenant.flats_4bhk}
                        onChange={handleChange}
                        placeholder="flats_4bhk"
                    />
                    <button onClick={handleAddOrUpdate}>
                        {isUpdateMode ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>


        </div>
    );
}
