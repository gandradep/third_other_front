import React, { useState, useEffect } from 'react';

const ShowForm = ({shows}) => {
  const [isCreatingNewVenue, setIsCreatingNewVenue] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsCreatingNewVenue(event.target.checked);
  };

  useEffect(() => {
    console.log(isCreatingNewVenue);
  }, [isCreatingNewVenue]);

  return(
    <>
    <form action="">
      <label htmlFor="venue">Choose Venue: </label>
      <select name="venue" id="venue" disabled={isCreatingNewVenue}>
      {shows.map((show, index) => (
          <option value={show.venue.name}>
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
    </>
  )
}

export default ShowForm;