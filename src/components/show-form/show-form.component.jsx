import React, { useState, useEffect } from 'react';
import VenueForm from '../venue-form/venue-form.component';

const ShowForm = ({shows}) => {
  const [isCreatingNewVenue, setIsCreatingNewVenue] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsCreatingNewVenue(event.target.checked);
    console.log(isCreatingNewVenue);
  };

  useEffect(() => {
    console.log("use: "+isCreatingNewVenue);
  }, [isCreatingNewVenue]);

  return(
    <>
      <form action="">
        <label htmlFor="venue">Choose Venue: </label>
        <select name="venue" id="venue" disabled={isCreatingNewVenue}>
        {shows.map((show, index) => (
            <option key={index} value={show.venue.name}>
              {show.venue.name}
            </option>
          ))}
        </select>
        <input
              type="checkbox"
              id="createNewVenue"
              name="createNewVenue"
              checked={isCreatingNewVenue}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="createNewVenue">Create New Venue</label>
      </form>
      {isCreatingNewVenue && <VenueForm />}
    </>
  )
}

export default ShowForm;