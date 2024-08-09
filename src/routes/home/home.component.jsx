import React from 'react';
import moment from 'moment-timezone';

const Home = ({ shows }) => {
  return (
    <div>
      <h1>List of Shows</h1>
      <ul>
        {shows.map((show, index) => {
          // Convert event_date from UTC to the specified time_zone
          const eventDate = show.event_date ? show.event_date : '';
          const timeZone = show.time_zone ? show.time_zone : 'UTC';
          // Convert event_date from UTC to the specified time_zone
          const localDate = eventDate
            ? moment.utc(eventDate).tz(timeZone, true).format('YYYY-MM-DD HH:mm:ss')
            : 'No date available';

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


