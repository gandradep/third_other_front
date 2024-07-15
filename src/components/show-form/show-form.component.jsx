import React, { useState, useEffect } from 'react';
import VenueForm from '../venue-form/venue-form.component';

const ShowForm = ({shows}) => {
  const [isCreatingNewVenue, setIsCreatingNewVenue] = useState(false);
  const [showData, setShowData] = useState({
    title:'',
    description:'',
    url_flyer:'',
    show_recording_link:'',
    event_date:'',
    venue_id:''
  });

  const [newVenueData, setNewVenueData] = useState({
    name:'',
    url_location:'',
    city:'',
    country:''
  });

  // useEffect to set default value for venue_id on component mount
  useEffect(() => {
    if (shows.length > 0) {
      setShowData(prevShowData => ({
        ...prevShowData,
        venue_id: shows[0].venue.id // Set the first venue ID as default
      }));
    }
  }, [shows]);

  const handleCheckboxChange = (event) => {
    setIsCreatingNewVenue(event.target.checked);

  };

  const handleShowChange = (event) => {
    const { name, value } = event.target;
    setShowData({ ...showData, [name]: value });

  };

  const handleVenueChange = (event) => {
    const { name, value } = event.target;
    setNewVenueData({ ...newVenueData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const showPayload = { ...showData };

    if (isCreatingNewVenue) {
      showPayload.new_venue = newVenueData;
    }

    fetch('http://localhost:3001/shows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(showPayload)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle success response (e.g., redirect to the show page or display a success message)
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error response (e.g., display error messages)
    });
  };

  const uniqueVenues = Array.from(
    new Map(shows.map(show => [show.venue.id, show.venue])).values()
  );


  return(
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={showData.title} onChange={handleShowChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={showData.description} onChange={handleShowChange} />
        </div>
        <div>
          <label htmlFor="url_flyer">URL Flyer:</label>
          <input type="text" id="url_flyer" name="url_flyer" value={showData.url_flyer} onChange={handleShowChange} />
        </div>
        <div>
          <label htmlFor="show_recording_link">Show Recording Link:</label>
          <input type="text" id="show_recording_link" name="show_recording_link" value={showData.show_recording_link} onChange={handleShowChange} />
        </div>
        <div>
          <label htmlFor="event_date">Event Date:</label>
          <input type="datetime-local" id="event_date" name="event_date" value={showData.event_date} onChange={handleShowChange} />
        </div>

        <div>
          <label htmlFor="venue">Choose Venue: </label>
          <select name="venue_id" id="venue" value={showData.venue_id} onChange={handleShowChange} disabled={isCreatingNewVenue}>

            {uniqueVenues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              ))}
          </select>
        </div>
        <div>
        <input
              type="checkbox"
              id="createNewVenue"
              name="createNewVenue"
              checked={isCreatingNewVenue}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="createNewVenue">Create New Venue</label>
        </div>
        {isCreatingNewVenue && (
          <VenueForm venueData={newVenueData} handleVenueChange={handleVenueChange} />
        )}
        <div>
          <button type="submit">Create Show</button>
        </div>
      </form>
      {/* {shows.map((show) => {
      console.log(show.venue.id); // Log show.venue.id here
      return null; // or another element if needed
    })} */}
    </>
  );
};

export default ShowForm;