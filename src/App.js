import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import CreateShow from './routes/create_show/create_show.component';
import CreatePerformance from './routes/create_performance/create_performance.component';
import AdminMenu from './routes/admin_menu/admin_menu.component';
import EditShow from './routes/edit_shows/edit_shows.component';
import VenueList from './routes/edit_venue/edit_venue.component';

function App() {
  const [shows, setShows] = useState([]);

  const fetchShows = async () => {
    try {
      const response = await fetch('http://localhost:3001/shows');
      const data = await response.json();
      setShows(data);
    } catch (error) {
      console.error('Error fetching shows: ', error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home shows={shows} />} />
      <Route path="/admin" element={<AdminMenu />} />
      <Route path="/create" element={<CreateShow shows={shows} />} />
      <Route path="/editShow" element={<EditShow shows={shows} setShows={setShows} refreshShows={fetchShows} />} />
      <Route path="/performance/new" element={<CreatePerformance />} />
      <Route path="/editVenue" element={<VenueList refreshShows={fetchShows} />}/>
    </Routes>
  );
}

export default App;
