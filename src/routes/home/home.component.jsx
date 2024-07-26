import React from 'react';

const Home = ({shows}) => {

  return (
    <div >
      <h1>List of Shows</h1>
      <ul>
        {shows.map((show, index) => (
          <li key={index}>
            <p>{show.title} - {show.description}</p>
            <p>{show.event_date} - {show.time_zone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
