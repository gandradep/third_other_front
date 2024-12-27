import React, { useState } from 'react';

const VenueForm = ({ venues, onSuccess }) => {
  const [venueData, setVenueData] = useState({
    name: '',
    url_location: '',
    city: '',
    country: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleVenueChange = (event) => {
    const { name, value } = event.target;
    setVenueData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const checkIfDuplicate = () => {
    const duplicate = venues.some(
      (venue) =>
        venue.name.toLowerCase() === venueData.name.toLowerCase() &&
        venue.city.toLowerCase() === venueData.city.toLowerCase() &&
        venue.country.toLowerCase() === venueData.country.toLowerCase()
    );
    return duplicate;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (checkIfDuplicate()) {
      setErrorMessage(
        'A venue with the same name, city, and country already exists.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/venues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venueData),
      });

      if (!response.ok) {
        throw new Error('Failed to create venue. Please try again.');
      }

      const data = await response.json();
      console.log('Venue created:', data);

      if (onSuccess) {
        onSuccess(data);
      }

      // Reset form
      setVenueData({
        name: '',
        url_location: '',
        city: '',
        country: '',
      });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>New Venue Details</h3>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <div>
        <label htmlFor="venue_name">Name:</label>
        <input
          type="text"
          id="venue_name"
          name="name"
          value={venueData.name}
          onChange={handleVenueChange}
          required
        />
      </div>

      <div>
        <label htmlFor="url_location">URL Location:</label>
        <input
          type="text"
          id="url_location"
          name="url_location"
          value={venueData.url_location}
          onChange={handleVenueChange}
          required
        />
      </div>

      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={venueData.city}
          onChange={handleVenueChange}
          required
        />
      </div>

      <div>
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={venueData.country}
          onChange={handleVenueChange}
          required
        />
      </div>

      <div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Create Venue'}
        </button>
      </div>
    </form>
  );
};

export default VenueForm;
