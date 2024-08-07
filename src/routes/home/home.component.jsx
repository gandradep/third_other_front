import React from 'react';
import moment from 'moment-timezone';

const Home = ({ shows }) => {
  return (
    <div>
      <h1>List of Shows</h1>
      <ul>
        {shows.map((show, index) => {
          // Convert event_date from UTC to the specified time_zone
          const localDate = moment.utc(show.event_date).tz(show.time_zone).format('YYYY-MM-DD HH:mm:ss');

          return (
            <li key={index}>
              <p>{show.title} - {show.description}</p>
              <p>{localDate} - {show.time_zone}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;

