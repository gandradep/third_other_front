import React from 'react';

const VenueForm = ({venueData, handleVenueChange }) => {

  return (
    <div>
      <h3>New Venue Details</h3>
      <div>
        <label htmlFor="venue_name">Name:</label>
        <input type="text" id="venue_name" name="name" value={venueData.name} onChange={handleVenueChange} />
      </div>
      <div>
        <label htmlFor="url_location">URL Location:</label>
        <input type="text" id="url_location" name="url_location" value={venueData.url_location} onChange={handleVenueChange} />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" value={venueData.city} onChange={handleVenueChange} />
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" value={venueData.country} onChange={handleVenueChange} />
      </div>
    </div>
  );
}

export default VenueForm;
