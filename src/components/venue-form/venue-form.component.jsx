import React, { useState } from 'react';

const VenueForm = () => {
  const [venueData, setVenueData] = useState({
    name:'',
    url_location:'',
    city:'',
    country:''
  });

  return (
    <div >
      <h1>Venue Form</h1>

    </div>
  );
}

export default VenueForm;
