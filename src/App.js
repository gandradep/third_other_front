import React, { useState, useEffect } from 'react';

function App() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('http://localhost:3001/');
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching shows: ', error);
      }
    };

    fetchShows();
  }, []);

  return (
    <div >
      <h1>List of Shows</h1>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            {show.title} - {show.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
