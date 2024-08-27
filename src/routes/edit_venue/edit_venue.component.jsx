import React, { useState, useEffect } from 'react';
import NavAdmin from '../../components/nav-admin/nav-admin-component';


const VenueList = () => {
  const [venues, setVenues] = useState([]);
  const [editingVenue, setEditingVenue] = useState(null);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await fetch('http://localhost:3001/venues');
      const data = await response.json();
      setVenues(data);
    } catch (error){
      console.error('Error fetching venues:', error);
    }
  };

  const handleEdit = (venue) => {
    setEditingVenue({ ...venue });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingVenue(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bodyData = { venue: editingVenue};
    console.log('Request body:', JSON.stringify(bodyData));

    try{
      const response = await fetch(`http://localhost:3001/venues/${editingVenue.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(bodyData),
      });
      if (response.ok) {
        const updatedVenues = venues.map(venue =>
          venue.id === editingVenue.id ? editingVenue : venue
        );
        setVenues(updatedVenues);
        setEditingVenue(null);
      } else {
        throw new Error('Failed to update venue');
      }
    }catch (error) {
      console.error('Error updating venue:', error);
    }
  };

  const cancelEdit = () => {
    setEditingVenue(null);
  }
  return (
    <div>
      <NavAdmin />
      <h1>Venues</h1>
      {venues.map(venue => (
        <div key={venue.id}>
          {editingVenue && editingVenue.id === venue.id ? (
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                value={editingVenue.name}
                onChange={handleChange}
              />
              <input
                name="url_location"
                value={editingVenue.url_location}
                onChange={handleChange}
              />
              <input
                name="city"
                value={editingVenue.city}
                onChange={handleChange}
              />
              <input
                name="country"
                value={editingVenue.country}
                onChange={handleChange}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={cancelEdit}>Cancel</button>
            </form>
          ) : (
            <>
              <h2>{venue.name}</h2>
              <p>Location: {venue.url_location}</p>
              <p>City: {venue.city}</p>
              <p>Country: {venue.country}</p>
              <button onClick={() => handleEdit(venue)}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default VenueList;
