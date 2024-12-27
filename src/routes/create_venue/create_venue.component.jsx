import React, { useState, useEffect } from 'react';
import VenueForm from '../../components/venue-form/venue-form.component';
import NavAdmin from '../../components/nav-admin/nav-admin-component';

const CreateVenue = () => {
  const [venues, setVenues] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch('http://localhost:3001/venues');
        if (!response.ok) {
          throw new Error('Failed to fetch venues');
        }
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchVenues();
  }, []);

  const handleSuccess = (newVenue) => {
    // Add the new venue to the local state to avoid refetching
    setVenues((prevVenues) => [...prevVenues, newVenue]);
  };

  return (
    <div>
      <NavAdmin />
      <h1>Create New Venue</h1>
      <h2>Existing Venues</h2>
      {venues.length > 0 ? (
        <ul>
          {venues.map((venue) => (
            <li key={venue.id}>
              <strong>{venue.name}</strong> - {venue.city}, {venue.country}
            </li>
          ))}
        </ul>
      ) : (
        <p>No venues available.</p>
      )}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <VenueForm venues={venues} onSuccess={handleSuccess} />
    </div>
  );
};

export default CreateVenue;
